#/bin/bash

# 注意：绝对路径耦合
# - install_jekyll.sh
# - isc_site_auto_ci.service
# - auto_sync.sh

#/bin/bash

echo "mkdir..."
sudo mkdir -p /workspaces
sudo chown ${USER} /workspaces
echo $(ls -l /workspaces)


cd /workspaces
echo "pwd: $(pwd)"

echo "use personal access token as password"
git clone https://github.com/DKE-YNU/isc_site.git
echo $(ls -l)

cd isc_site
echo "pwd: $(pwd)"

git config credential.helper store
git push
git pull

echo "sudo chown ${USER} /var/www/html"
sudo chown ${USER} /var/www/html

echo "rm -rf /var/www/html/*"
rm -rf /var/www/html/*

echo "ln -s /var/www/html _site"
ln -s /var/www/html _site

echo "chmod 744 auto_sync.sh"
chmod 744 auto_sync.sh

echo "sudo cp isc_site_auto_ci.service /etc/systemd/user/"
sudo cp isc_site_auto_ci.service /etc/systemd/user/

echo "sudo chmod 664 /etc/systemd/user/isc_site_auto_ci.service"
sudo chmod 664 /etc/systemd/user/isc_site_auto_ci.service

echo "sudo systemctl daemon-reload"
sudo systemctl daemon-reload
sleep 3s

echo "systemctl --user enable isc_site_auto_ci.service"
systemctl --user enable isc_site_auto_ci.service

echo "systemctl --user start isc_site_auto_ci.service"
systemctl --user start isc_site_auto_ci.service

echo "check status :systemctl status"