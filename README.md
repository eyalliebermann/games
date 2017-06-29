# Game scrapper
This application is an exercise in web scrapping. 
It shows a possible path and raises some questions I would try to address here
It's never meant to be production mature though.

# The problem
Collecting unstructred information from several sources and showing them on a web page

# The current code
## Server
A node application collects data from a few url that are structured similarly.
cheerio is used to scrap server rendered html page.
Additional queries or an entire headless browser might be needed to scrap dynamic client rendered content
The data is exposed through an api

## client
React table gets the data from the server

# What's next
Assuming many more requests than changes on the sources, some caching should be done
Assuming multiple agents and scrapping solutions, the scrapping part should be independent of the client request
An agent should have its own database so it can determine independently if data has been added or updated
The server that exposes the combined data should be a micro service and should expose an internal API to get updates on new scrapped pieces


