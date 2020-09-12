---
title: Donanım Kimlikleri
date: 2018-07-28
description:
    Linuxda kulanabilecek donanım kimlikleri
---




<h1>Donanım Kimlikleri</h1>

/ sys / class / dmi / id / product_uuid: Kart üreticisi tarafından ayarlanan ve BIOS DMI bilgisinde
kodlanan ana kart ürünü UUID. Bir anakartı ve sadece anakartı tanımlamak için kullanılabilir.
Kullanıcı ana kartı değiştirdiğinde değişir. Ayrıca, çoğu zaman BIOS üreticisi içine sahte seri yazar.
Ayrıca, x86'ya özgüdür. Ayrıcalıklı kullanıcılar için erişim yasaktır. Bu nedenle genel kullanımı
azdır.

CPUID / EAX = 3 CPU seri numarası: CPU üreticisi tarafından ayarlanan ve CPU çipinde kodlanan
bir CPU UUID. Bir CPU'yu ve sadece bir CPU'yu tanımlamak için kullanılabilir. Kullanıcı CPU yu
değiştirdği vakit değişir. Ayrıca, modern CPU'ların çoğu artık bu özelliği uygulamaz ve eski
bilgisayarlar BIOS Kurulumu seçeneği ile kontrol edilebilen varsayılan olarak bu seçeneği devre
dışı bırakma eğilimindedir. Ayrıca, x86'ya özgüdür. Dolayısıyla bu da çok az kullanılır.

/ sys / class / net / * / address: Ağ bağdaştırıcısı üreticisi tarafından ayarlanan ve bazı ağ kartı
EEPROM'da kodlanan bir veya daha fazla ağ MAC adresi. Kullanıcı ağ kartını değiştirdiğinde
değişir. Ağ kartları isteğe bağlı olduğundan ve bu kimlik garanti edilmezse ve birden fazla seçim
yapabileceğinizde birden fazla kullanılabilirlik olabilir. Sanal makinelerde MAC adresleri rastgele
olma eğilimindedir. Bu da çok az genel kullanımdır.

/ sys / bus / usb / device / * / : USB aygıtında EEPROM olarak kodlanan çeşitli USB aygıtlarının
seri numaraları. Çoğu cihazın seri numarası ayarlanmamıştır ve eğer varsa genellikle sahte olur.
Kullanıcı USB donanımını değiştirir veya başka bir makineye takarsa, bu kimlikler diğer
makinelerde değişebilir veya görünebilir. Bu yüzden de çok az faydası var. Birçoğu sabit diskler ve
benzerleri gibi çeşitli cihazların ID_SERIAL udev özelliği aracılığıyla bulabileceğiniz çeşitli başka
donanım kimlikleri de vardır. Hepsinin ortak noktası, evrensel olarak bulunmayan, genellikle sahte
verilerle doldurulmuş ve sanallaştırılmış ortamlarda rasgele olan belirli (değiştirilebilir) donanıma
bağlı olmalarıdır.

Yazılım kimlikleri

/ proc / sys / kernel / random / boot_id: Her önyüklemede yeniden oluşturulan rastgele bir kimlik.
Bu nedenle, yerel makinenin mevcut önyüklemesini tanımlamak için kullanılabilir. Evrensel olarak
herhangi bir Linux çekirdeğinde kullanılabilir. Belirli bir önyükleme çekirdeğinde belirli bir
önyükleme tanımlamanız gerekiyorsa iyi ve güvenli bir seçimdir. Ama kalıcı değildir adında da
anlaşılabileceği gibi yer yeni boot da değişir.

gethostname (), / proc / sys / kernel / hostname: Ağdaki bir makineyi tanımlamak için yönetici
tarafından yapılandırılan rastgele olmayan bir kimlik. Genellikle bu ayarlanmaz veya localhost gibi
bazı varsayılan değerlere ayarlanır ve hatta yerel ağda benzersiz değildir. Ayrıca, çalışma zamanı
sırasında değişebilir, örneğin güncellenmiş DHCP bilgilerine göre değiştiği için. Bu nedenle,
kullanıcıya sunum dışında herhangi bir şey için neredeyse tamamen yararsızdır.

ID_FS_UUID: udev ağacındaki belirli bir dosya sistemini tanımlayan bir kimlik. Bu dizilerin nasıl
üretildiği her zaman açık değildir, ancak bu neredeyse tüm modern disk dosya sistemlerinde
kullanılabilir. NFS bağlantıları veya sanal dosya sistemleri için kullanılamaz. Bununla birlikte, bu
genellikle bir dosya sistemini tanımlamak için iyi bir yoldur. Bununla birlikte, zayıf tanımlanmış id
yapısı nedeniyle D-Bus makine kimliği genellikle tercih edilir. Biz senorya gereği disk değişimi ve
Disk UUID lerinin manipüle edileceğini varsayılarak bu yöntemden vazgeçtik.
