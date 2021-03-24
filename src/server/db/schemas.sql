create table authors (
id int not null auto_increment primary key,
name varchar(50) not null,
email varchar(50) not null,
_created datetime default current_timestamp
)



create table Blogs(
	id int not null auto_increment primary key,
    title varchar(50) not null,
    content varchar(200) not null,    
    authorid int null,
    _created datetime default current_timestamp)



    create table tags (
id int not null auto_increment primary key,
name varchar(50) not null,
_created datetime default current_timestamp
)


create table BlogTags (
	blogid int null,
    tagid int null
    )


-- Auth Blog --

create table users(
	password varchar(60) null,
    email varchar(60),
    role varchar(25) default 'guest'
    );
    
    create table accesstokens (
    id int not null auto_increment primary key, 
    userid int not null,
    tokens text null,
    expires datetime null,
    _created datetime default current_timestamp
    );
