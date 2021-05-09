# Joe's Kitchen

> By Tony, Alex, and Ryan  
> TOHacks 21 Submission

## Try it Out!
1. Install npm and the lastest version of node at https://nodejs.org/en/
2. Clone the repo
3. Insider the repo, run `npm install`
4. `npm start` to start the expo console
5. On the leftside, click on your desired platform to run the app. You can also scan the qr code with your phone to run it on your phone!

## Inspiration
35.5 billion kilograms of food is wasted every year in Canada, with the average consumer wasting 2 kilograms of food every week. This is equivalent to 56.5 million tonnes of CO2 emissions, or the carbon footprint for 12 million cars per year. Since the pandemic, people have started to become more aware of the food they waste due to more time spent at home, but when this inevitably ends, people are going to go back to their old ways.

We wanted to solve this by introducing a new solution, an easy to use app that allows you to find recipes for the food that you have in your fridge, right now. Not only are you saving the environment through reducing your food waste, but it's never been easier and faster to find recipes for your next meal.

## What it does
Our app identifies food ingredients using your camera, and uses this information to find recipes that use the food that you have right now, so none of it goes to waste. By using fast API endpoints from Google, we hope to present a seamless user experience that makes every meal more enjoyable.

## How we built it
Our React Native app runs on mobile devices using Expo, and uses the expo-camera module to take pictures. The images are then uploaded to the Cloud vision API using axios, and the labels are returned. Processing the labels through fuzzy text matching using fuzzyset, we then send the list of processed labels to spoonacular's API using axios. From there, we obtain a list of recipes and the number of matching ingredients they use. We can then sort and present this information in our app.

## Challenges we ran into
A major challenge that we encountered was interfacing the Google Cloud Vision and Spoonacular's APIs. Since the labels that GCV API returned were very general, mixing labels like "kitchen appliance," or "table" with "lemon" and "broccoli", they were not guaranteed to match with ingredients from Spoonacular's database. Our solution for this problem was fuzzy text matching on a set of food vocabulary, which allowed us to make meaningful calls to the Spoonacular API.

Another challenge was working in a fully online environment, which made tools like GitHub and Discord vital to our project's success. By taking advantage of these platforms for communication, we learned much more than we would have in person about these tools.

## Accomplishments that we're proud of
As this is our team's first online hackathon together, we were especially proud of our efforts to parallelize work and complete the project on time.

## What we learned
Through this project, we significantly improved our knowledge of the React framework, the APIs we used, and mobile development. One member of our team had never worked with Javascript before, but they were able to learn enough to contribute a fair portion to the project. We also learned how to interact with Google's vision API in an efficient manner directly from the front end.

## What's next for Joe's Kitchen
Next steps for Joe's Kitchen are to fine tune the model used to identify food items. As powerful as Google's cloud vision API is, it does not have the level of precision we would like for a potential final product. We hope to use Google's AutoML system along with our own training data to create a more focused model that would be able to identify various foods quickly and accurately. Further development on the user interface would of course make the entire experience much smoother as well.

## Who's Joe?
You probably don't want to ask this question...
