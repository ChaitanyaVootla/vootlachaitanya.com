yes | sudo apt update
yes | sudo apt install nginx
yes | sudo ufw allow 'Nginx HTTP'
yes | sudo ufw allow 22
yes | sudo ufw allow https
yes | sudo ufw enable

# cert bot SSL
yes | apt-get update
yes | sudo apt-get install certbot
yes | apt-get install python3-certbot-nginx

# enable cert bot for vootlachaitanya.com and www.vootlachaitanya.com
# !add A records for both the above domains point them to the machine 
sudo certbot --nginx -d vootlachaitanya.com -d www.vootlachaitanya.com
sudo certbot --nginx -d stonks.vootlachaitanya.com

# puppeteer dependencies
sudo apt update && sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
