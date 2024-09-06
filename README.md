# <Machine-Downtime-Tracker>

## Description

The goal was to create a machine downtime tracking website. It tracks when the machine was down for a given shift, the duration, the reason why, and any comments the users would like to add.

The inspiration came from one of Arjun’s work responsibilities. His task is to create a downtime tracking sheet, print it so operators running the machines can fill out the forms, enter filled out data onto Excel to store data & create graphs, relay to his engineering team which issues need to be addressed first as the aim is to keep the machine running and minimize downtime.

Therefore, website will be used to streamline and automate the process of filling out and storing the downtime data.



## Installation

No installation required. Users need a computer and a connection to the internet. 


## Usage

#### The video below shows the web application's appearance and functionality:


https://github.com/user-attachments/assets/f9a036ee-6f8c-44f6-8cd3-ee9da0c86450


#### Have a look for yourself! https://apatel62.github.io/Project-1/

## Credits


Arjun Patel -   [Arjun's GitHub](https://github.com/apatel62) <br>
Destinee Miles - [Destinee's GitHub](https://github.com/Destineeco) <br>
Dzenis Coragic - [Dzenis' GitHub](https://github.com/DzenisCoragic)


## License

#### MIT License

Copyright (c) 2024 apatel62

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE



## Features

### User story:

```
GIVEN a downtime tracker
WHEN I load the website
THEN I am presented with a landing page containing a form that asks for the shift
WHEN I select either 1 or 2 for the shift
THEN I am presented with which machine it is for
WHEN I select either 1 or 2 for the machine
THEN I am presented with a category to select
WHEN I select the category
THEN I am presented with a specific issue to select
WHEN I select the specific issue
THEN I am presented with how long the machine was down for
WHEN I enter the minutes the machine was down for
THEN I am presented with comments and the submit button
WHEN I press submit
THEN I am prompted if I want to add another time the machine was down or if I am done with my shift
WHEN I click on add another time
THEN the form page re-initializes to be filled out again
WHEN I select I am done with my shift
THEN a confirm pop-up appears if I am ready for the report
WHEN I click that I am ready for the report
THEN I am redirected to the report page
WHEN I view the report page
THEN I am presented with a header and a back button
WHEN I click the back button
THEN I am redirected to the form page to enter machine downtime for another shift
WHEN I view the main content of the report page
THEN I am presented with two tables and two bar graphs
WHEN I view the tables
THEN I see the specific issues for each machine, the time these issues caused the machine to be down in (HH:MM) format, any comments that were included, and the total downtime the machine was down for the shift
WHEN I view the bar graphs
THEN I see the specific issues for each machine on the x-axis and the time these issues caused the machine to be down in (HH:MM) format on the y-axis
```
