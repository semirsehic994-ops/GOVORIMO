package ba.govorimo.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Nakon restarta telefona ili ažuriranja aplikacije ponovo zakazuje podsjetnik i provjeru verzije. */
public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent intent) {
        String a = intent.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(a) || Intent.ACTION_MY_PACKAGE_REPLACED.equals(a)) {
            Notifs.scheduleReminder(c);
            Notifs.scheduleUpdateJob(c);
        }
    }
}
