#import "RNGoogleCast.h"

#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>

@implementation RNGoogleCast {
    NSMutableDictionary *channels;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (instancetype)init {
    self = [super init];
    channels = [[NSMutableDictionary alloc] init];
    return self;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

# pragma mark - GCKCastContext methods

RCT_REMAP_METHOD(getCastDevice,
                 getCastDeviceWithResolver: (RCTPromiseResolveBlock) resolve
                 rejecter: (RCTPromiseRejectBlock) reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        GCKSession* session = GCKCastContext.sharedInstance.sessionManager.currentSession;
        if (session == nil || session.device == nil) {
            resolve(nil);
        } else {
            resolve(@{
                @"id": session.device.uniqueID,
                @"version": session.device.deviceVersion,
                @"name": session.device.friendlyName,
                @"model": session.device.modelName,
            });
        }
    });
}

RCT_REMAP_METHOD(getCastState,
                 getCastStateWithResolver: (RCTPromiseResolveBlock) resolve
                 rejecter: (RCTPromiseRejectBlock) reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        resolve(@([GCKCastContext.sharedInstance castState]));
    });
}

# pragma mark - GCKCastSessionManager methods

RCT_EXPORT_METHOD(startSession: (NSString *)deviceId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        GCKDevice* device = [GCKCastContext.sharedInstance.discoveryManager deviceWithUniqueID:deviceId];
        if (device) {
            [GCKCastContext.sharedInstance.sessionManager startSessionWithDevice:device];
            resolve(@(YES));
        } else {
            NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:GCKErrorCodeUnknown userInfo:nil];
            reject(@"not_found", @"Device not found!", error);
        }
    });
}

RCT_EXPORT_METHOD(endSession: (BOOL)stopCasting
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([GCKCastContext.sharedInstance.sessionManager endSessionAndStopCasting:stopCasting]) {
            resolve(@(YES));
        } else {
            NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:GCKErrorCodeNoMediaSession userInfo:nil];
            reject(@"no_session", @"No castSession!", error);
        }
    });
}

# pragma mark - GCKCastSession methods

RCT_EXPORT_METHOD(initChannel: (NSString *)namespace
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        GCKGenericChannel *channel = [[GCKGenericChannel alloc] initWithNamespace:namespace];
        self->channels[namespace] = channel;
        [GCKCastContext.sharedInstance.sessionManager.currentCastSession addChannel:channel];
        resolve(@(YES));
    });
}

#pragma mark - GCKCastChannel methods

RCT_EXPORT_METHOD(sendMessage: (NSString *)message
                  toNamespace: (NSString *)namespace
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
    GCKCastChannel *channel = channels[namespace];
    
    if (!channel) {
        NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain code:GCKErrorCodeChannelNotConnected userInfo:nil];
        return reject(@"no_channel", [NSString stringWithFormat:@"Channel for namespace %@ does not exist. Did you forget to call initChannel?", namespace], error);
    }
    
    NSError *error;
    [channel sendTextMessage:message error:&error];
    if (error != nil) {
        reject(error.localizedFailureReason, error.localizedDescription, error);
    } else {
        resolve(@(YES));
    }
}

@end
