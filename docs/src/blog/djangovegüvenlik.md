---
title: Django ve Güvenlik
date: 2018-07-28
description:
    Django Framework'ü üzerindeki varsayılan güvenlik tedbirleri
---
<!-- wp:paragraph -->
<p>
Django
birçok güvenlik özelliği içerir. Bazıları yerleşiktir ve her
zaman etkindir. Diğerleri her zaman uygun olmadıkları için veya
geliştirme için elverişsiz oldukları için isteğe bağlıdır.</p>
<!-- /wp:paragraph -->
<pre><code>manage.py check deploy </code></pre>
Yukarıdaki Komut  bize hangi alanlarda zafiyete düşebileceğimizi belirtiyor.

<!-- wp:heading -->
<h2>Secret
Key</h2>
<!-- /wp:heading -->
Kullanılan anahtarın başka hiçbir yerde kullanılmadığından emin olunmalı ve kaynak kontrolü yapmaktan kaçınılmalı .
DEBUG
Ürünün son halinde hata ayıklamayı asla etkinleştirmemelisiniz. Projenizi kesinlikle DEBUG = True ile geliştiriyorsunuz çünkü bu, kullanışlı özellikler sağlıyor. Ürün haline geldikten sonra DEBUG kapatılacaktır, çünkü projeniz hakkında çok fazla bilgi sızdırılmasına sebeb olmaktadır. (kaynak kodunuzun alıntıları, yerel değişkenler, ayarlar, kullanılan kütüphaneler, vb.)

###ALLOWED_HOSTS
Bu ayar, sitenizi bazı CSRF saldırılarına karşı korumak için gereklidir. Bir joker karakter kullanıyorsanız, Host HTTP üstbilgisi için kendi doğrulamanızı yapmanız veya başka bir şekilde bu saldırı kategorisine karşı savunmasız olmadığınızdan emin olmanız gerekir.

Ana bilgisayarı doğrulamak için Django’nun önünde yer alan Web sunucusunu da yapılandırmanız gerekir. Statik bir hata sayfasıyla yanıt vermeli veya isteği Django’ya iletmek yerine yanlış ana bilgisayar isteklerini yok saymalıdır.

Örnek vermek gerekirse:

Exception veya url istek hataları bizim oluşturacağımız ve tekrar linklere bağlantı sağlıyabileceğimiz statik sayfalara yönlendirmeliyiz.

DEBUG = False olarak ayarlandığında bu yapılandırma hatalı ise istekler Bad Request (400)”. Dönecektir.

###CACHE
Önbellek kullanıyorsanız, bağlantı parametreleri geliştirme sürecinde ve üründe farklı olabilir. Önbellek sunucuları genellikle zayıf kimlik doğrulamasına sahiptir.Kullanıcılar sisteme giriş yaptıktan sonra veya LDAP otontikasyonu sağladıktan sonra Django nun admin paneline girişi sınırlandırılmalıdır. Yalnızca uygulama sunucularınızdan gelen bağlantıları kabul ettiklerinden emin olun.Memcached kullanıyorsanız, performansı artırmak için önbelleğe alınmış oturumlar kullanmayı düşünün.

####Memcached nedir?
Memcached bir arka plan programı olarak çalışır ve belirtilen miktarda RAM olarak ayrılır. Tek yaptığı önbellek veri eklemek, almak ve silmek için hızlı bir arayüz sağlamaktır. Tüm veriler doğrudan bellekte saklanır, bu nedenle veritabanı veya dosya sistemi kullanımında ek yük yoktur. Memcached’i kurduktan sonra, Memcached bağlayıcısı kurmanız gerekir.

###DATABASE
Veritabanı bağlantı parametreleri geliştirme ortamı ve ürün kısmında muhtemelen farklıdır. Veritabanı şifreleri çok hassastır. Bunları aynen SECRET_KEY gibi korumalısınız. Maksimum güvenlik için, veritabanı sunucularının yalnızca uygulama sunucularınızdan gelen bağlantıları kabul ettiğinden emin olun. Veritabanınız için yedek politikası oluşturulması gerekmektedir.

###FILE_UPLOAD_PERMISSIONS
Varsayılan dosya yükleme ayarlarında, FILE_UPLOAD_MAX_MEMORY_SIZE boyutundan küçük dosyalar FILE_UPLOAD_PERMISSIONS bölümünde açıklandığı gibi daha büyük dosyalardan farklı bir modda saklanabilir. FILE_UPLOAD_PERMISSIONS ayarı, tüm dosyaların aynı izinlerle yüklenmesini sağlar.

Çoğu platformda, geçici dosyaların modu 600 olur ve bellekten kaydedilen dosyalar sistemin standart umask’ı kullanılarak kaydedilir. Güvenlik nedeniyle, bu izinler FILE_UPLOAD_TEMP_DIR içinde depolanan geçici dosyalara uygulanmaz. Bu ayar aynı zamanda collectstatic yönetim komutunu kullanırken toplanan statik dosyalar için varsayılan izinleri de belirler.

###HTTPS
HTTP ve HTTPS için aynı oturum çerezi kullanıldığından, kullanıcı hesabı veya yönetici gibi hassas alanları korumak yeterli değildir.

Sistemin bize önerdiği istekleri HTTPS üzerinden kabul etmemiz.

HTTPS üzerine kısa notlar

###CSRF_COOKIE_SECURE

CSRF çerezini yanlışlıkla HTTP üzerinden iletmemek için bunu True olarak

ayarlamayı sistem öneriyor.

SESSION_COOKIE_SECURE

Oturum çerezini yanlışlıkla HTTP üzerinden iletmemek için bunu True olarak ayarlamak gerekiyor.

CONN_MAX_AGE
Bir bağlantının maksimum ömrünü tanımlayan CONN_MAX_AGE parametresi tarafından kontrol edilirler. Her veritabanı için bağımsız olarak ayarlanabilir. Varsayılan değer 0’dır ve her isteğin sonunda veritabanı ba ğlantısını kapatmanın geçmiş davranışını korur. Kalıcı bağlantıları etkinleştirmek için CONN_MAX_AGE

değerini pozitif bir saniyeye ayarlamak gerekmektedir.Django, ilk kez veritabanı sorgusu yaptığında veritabanına bağlantı açar. Bu bağlantıyı açık tutar ve sonraki isteklerde yeniden kullanır. Django, CONN_MAX_AGE tarafından tanımlanan maksimum süre aştığında veya artık kullanılamadığında bağlantıyı kapatır. Ürün kısmında bu konu ne gibi sorunlara yol açabileceği tartışılmalı ve ona göre ayarlanmalıdır.

###LOGGING
Ürün hazır hale geldiği zaman kullanıma sunmadan önce günlük yapılandırmanızı gözden geçirin ve trafik alır almaz beklendiği gibi çalışıp çalışmadığını kontrol edin.

LOG seviyeleri

#####HATA AYIKLAMA: Hata ayıklama amacıyla düşük seviye sistem bilgisi

#####BİLGİ: Genel sistem bilgisi

#####UYARI: Meydana gelen ufak bir sorunu tanımlayan bilgiler.

#####HATA: Meydana gelen önemli bir sorunu tanımlayan bilgiler.


 
#####KRİTİK: Meydana gelen kritik bir sorunu tanımlayan bilgiler.

###Django Security Log
Güvenlik kaydedicileri, SuspiciousOperation ve güvenlikle ilgili diğer hataların; oluşması durumunda ileti alacaktır. Tüm SuspiciousOperations dahil olmak üzere her güvenlik hatasının alt türü için bir alt günlükleyici vardır. Log olayının seviyesi istisnanın nerede işlendiğine bağlıdır. Çoğu olay bir uyarı olarak günlüğe kaydedilirken, WSGI işleyicisine ulaşan herhangi bir SuspiciousOperation bir hata olarak günlüğe kaydedilir. Örneğin, ALLOWED_HOSTS ile eşleşmeyen bir istemcinin isteğine bir HTTP Ana Bilgisayar üstbilgisi dahil edildiğinde, Django 400 yanıtı döndürür ve django.security.DisallowedHost günlü ğüne bir hata iletisi kaydedilir. Bu günlük olayları, varsayılan olarak DEBUG = False olduğunda hata olaylarını yöneticilere gönderen django günlükçüsüne ulaşacaktır. Bir SuspiciousOperation nedeniyle 400 yanıtla sonuçlanan istekler, django.request günlükçüsüne değil, yalnızca django.security günlükçüsüne kaydedilir.

