package com.smsschedulerapp;

import com.facebook.react.ReactActivity;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.nagarro.schedulesms.ScheduleSMSReactPackage;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SMSSchedulerApp";
    }
}
