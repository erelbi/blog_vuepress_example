---
title: IFS
date: 2018-07-28
description:
    IFS NEDİR NE İŞE YARAR
---


<pre><code>
file=/tmp/deneme


if test -f "$file"; then
    echo "dosya mevcut"
else
  touch /tmp/deneme
fi

if [ -s "$_file" ] 
then
	echo "$_file içerisinde data var"
   	
else
	echo "$_file  içersinde data yok"
	sleep 1
	echo " data yükleniyor şuna $_file"
        echo "er|el|bi" > /tmp/deneme
	sleep 1
	echo " tamam tamam"
fi

IFS='|'
while read -r  bir iki uc
do
        printf " ilk hecesi %s dir...\n" $bir
        printf "ikinci hecesidir %s ...\n" $iki
        printf "ucuncu hecesidir %s ...\n" $uc
	
done < "$file" </code></pre>