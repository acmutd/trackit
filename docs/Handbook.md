# TrackIT User Handbook

A complete guide to using our application. If you are a developer looking to contribute to this project check our [dev readme](./README.md).

This project can be broadly split into two sections:

- Admin
- User

Learn more on how to make full use of all features on both sections below

## Admin

Steps to access Admin Account
 - Navigate to `/Admin`
 - Login using your admin credentials
 - If your account is registered on firebase and you have authorized admin acess, you will be directed to the _Admin Dashboard_
 - Here you will see a view of all workshops

Here, you will see a list of all workshops, their titles, dates, and a progress bar. This progress bar will change as a workshop progresses. Here the green represents the percentage of students who are on the same workshop level as the admin and the yellow is the percentage of students behind the workshop admin.

Note: At the top of the page are 3 tiles that contain tools to control all workshops. Here it is possible to perform the following functions:
 - Add new Workshop
 - Download All Workshop Data

Expanding workshop provides the full details. Here you will access to the following administrative functions to control the workshop state:
 - Enable Workshop
 - Disable Workshop
 - Edit Workshop
 - Export Workshop
 - Clear All Students
 - Delete Workshop

Underneath, you will also find a graph showing the number of students at each level as well as the progress of every individual student in the workshop.

## User

The user will be taken to a login page. When they enter valid account credentials, they will be redirected to a page where they can enter the workshop ID of the workshop they want to join. If this is valid, they are taken to the workshop.

On the workshop page, they will first see a welcome page. Upon going past that, they will officialy begin the workshop. A user will only be able to go as far the admin has enabled. Upon completing a level, they will click **Mark Complete** which will allow them to move to the next stage if the admin has allowed it. If not, they will wait until the admin allows it and the next button appears. They can navigate through the current page and previous pages using the **next** and **previous** buttons. At the top, you will see a progress bar. The green represents how far through the workshop you have progressed. The yellow represents how many levels you are behind the admin, and the red represents how many levels are left.

## Contributors

- [Harsha Srikara](https://harshasrikara.com)
- [Sivam Patel]()
- [Anirudh Emmadi]()

#### Questions

Sometimes you may have more questions regarding the usage of this product. If the answer was not found in this handbook please feel free to reach out to the above contributors or the [Director of Development](mailto:development@acmutd.co) for ACM

We request that you be as detailed as possible in your questions, doubts or concerns to ensure that we can be of maximum assistance. Thank you!

![ACM Development](https://www.acmutd.co/brand/Development/Banners/light_dark_background.png)
