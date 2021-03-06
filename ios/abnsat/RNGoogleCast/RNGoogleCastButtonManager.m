#import <React/RCTViewManager.h>
#import "RNGoogleCastButton.h"

@interface RNGoogleCastButtonManager : RCTViewManager
@end

@implementation RNGoogleCastButtonManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [[RNGoogleCastButton alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(triggersDefaultCastDialog, BOOL)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

@end
