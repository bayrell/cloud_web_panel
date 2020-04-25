if [ ! -d /data/named ]; then
	mkdir -p /data/named
	chown root:named /data/named
	cp -rfT /var/named/ /data/named/
fi

echo "nameserver 127.0.0.1" > /etc/resolv.conf
echo "nameserver 127.0.0.11" >> /etc/resolv.conf
echo "options ndots:0" >> /etc/resolv.conf
