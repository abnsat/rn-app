#import <GoogleCast/GoogleCast.h>
#import "RNGoogleCastButton.h"

@interface RNGoogleCastButton ()

@property (nonatomic, copy) RCTBubblingEventBlock onPress;

@end

@implementation RNGoogleCastButton {
    GCKUICastButton *_castButton;
    UIColor *_tintColor;
    BOOL _triggersDefaultCastDialog;
}

-(void)layoutSubviews {
    _castButton = [[GCKUICastButton alloc] initWithFrame:self.bounds];
    _castButton.tintColor = _tintColor;
    _castButton.triggersDefaultCastDialog = _triggersDefaultCastDialog;
    [_castButton addTarget:self action:@selector(didTouchUpInside:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:_castButton];
}

-(void)setTintColor:(UIColor *)color {
    _tintColor = color;
    super.tintColor = color;
    if (_castButton) {
        _castButton.tintColor = color;
    }
    [self setNeedsDisplay];
}

-(void)setTriggersDefaultCastDialog:(BOOL)triggersDefaultCastDialog {
    _triggersDefaultCastDialog = triggersDefaultCastDialog;
    if (_castButton) {
        _castButton.triggersDefaultCastDialog = triggersDefaultCastDialog;
    }
    [self setNeedsDisplay];
}

- (void)didTouchUpInside:(id)sender {
    if (_onPress) {
        if (GCKCastContext.sharedInstance.castState == GCKCastStateNotConnected) {
            NSMutableArray *devices = [[NSMutableArray alloc] init];
            for(int i = 0; i < GCKCastContext.sharedInstance.discoveryManager.deviceCount; i++) {
                GCKDevice *device = [GCKCastContext.sharedInstance.discoveryManager deviceAtIndex:i];
                [devices addObject:@{
                    @"id": device.uniqueID,
                    @"version": device.deviceVersion,
                    @"name": device.friendlyName,
                    @"model": device.modelName,
                }];
            }
            _onPress(@{
                @"state": @"Disconnected",
                @"devices": devices
            });
        }
        
        if (GCKCastContext.sharedInstance.castState == GCKCastStateConnected) {
            GCKSession* session = GCKCastContext.sharedInstance.sessionManager.currentSession;
            if (session) {
                _onPress(@{
                    @"state": @"Connected",
                    @"device": @{
                        @"id": session.device.uniqueID,
                        @"version": session.device.deviceVersion,
                        @"name": session.device.friendlyName,
                        @"model": session.device.modelName,
                    }
                });
            }
        }
    }
}

@end
