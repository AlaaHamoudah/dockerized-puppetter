# DOCKERIZED PUPPETEER! :whale:

Build the images:
`docker-compose build`

Run chrome and app services:
`docker-compose up -d chrome app`

In another tab, run the pusher service 
`docker-compose up -d  pusher`

Once pusher pushes the notifaction, a pdf file will be printed!
