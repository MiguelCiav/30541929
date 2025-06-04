FROM ubuntu/apache2
RUN apt update
RUN apt install git -y
RUN rm var/www/html/index.html
RUN git clone https://github.com/MiguelCiav/30541929.git var/www/html/