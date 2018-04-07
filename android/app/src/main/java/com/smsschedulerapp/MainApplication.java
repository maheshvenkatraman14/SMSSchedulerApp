package com.smsschedulerapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.nagarro.schedulesms.ScheduleSMSReactPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.react.SmsPackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ContactsWrapperPackage(),
          new ScheduleSMSReactPackage(),
          new SendSMSPackage(),
          new SmsPackage(),
          new BackgroundJobPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
