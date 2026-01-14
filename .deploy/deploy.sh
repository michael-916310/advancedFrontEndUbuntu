cd ~/advancedFrontEndUbuntu/
npm run build:prod
rm -rf ~/../var/www/advancedFrontEndUbuntu/html/
mv ~/advancedFrontEndUbuntu/build/ ~/../var/www/advancedFrontEndUbuntu/html
