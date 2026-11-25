package ba.govorimo.app;

import android.content.Context;

/** Tekstovi obavještenja na turskom ili arapskom, prema maternjem jeziku iz aplikacije. */
final class Txt {
    private Txt() {}

    static String get(Context c, String key) {
        boolean ar = "ar".equals(Prefs.get(c).getString("lang", "tr"));
        switch (key) {
            case "reminder": return ar ? "لم تتعلم اليوم بعد. أكمل درسا للحفاظ على سلسلتك!" : "Bugün henüz ders yapmadın. Serin için bir ders yap!";
            case "update_title": return ar ? "إصدار جديد %s جاهز" : "Yeni sürüm %s hazır";
            case "update_body": return ar ? "اضغط للتثبيت. يبقى تقدّمك محفوظا." : "Yüklemek için dokun. İlerlemen korunur.";
            case "downloading": return ar ? "جارٍ تنزيل التحديث…" : "Güncelleme indiriliyor…";
            case "allow_install": return ar ? "اسمح لـ Govorimo بتثبيت التحديث، ثم عد إلى التطبيق." : "Güncellemeyi yüklemek için Govorimo'ya izin ver, sonra uygulamaya geri dön.";
            case "install_ready": return ar ? "التحديث جاهز. اضغط للتثبيت." : "Güncelleme hazır. Yüklemek için dokun.";
            case "download_failed": return ar ? "تعذّر تثبيت التحديث. حاول لاحقا." : "Güncelleme yüklenemedi. Daha sonra tekrar dene.";
            case "ch_reminder": return ar ? "تذكير يومي" : "Günlük hatırlatma";
            case "ch_updates": return ar ? "التحديثات" : "Güncellemeler";
            default: return "";
        }
    }
}
