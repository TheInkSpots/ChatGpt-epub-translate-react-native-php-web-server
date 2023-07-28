#!/bin/bash

if [ ! -f /setup.lock ]; then
    apt-get -y update
    apt-get -y install python3 python python3-pip
    #python3 install pip
    pip install -U bbook_maker
    apt-get -y install php-mysql
    apt-get install -y libzip-dev
    docker-php-ext-install zip
    docker-php-ext-enable zip
    docker-php-ext-install mysqli 
    docker-php-ext-enable mysqli
    
    a2enmod rewrite
    touch /setup.lock
fi

docker-php-entrypoint apache2-foreground
