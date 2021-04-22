git pull origin

yarn --frozen-lockfile
yarn build

rm /srv/frontend/ -rf
mkdir /srv/frontend

mv ./build/* /srv/frontend/
