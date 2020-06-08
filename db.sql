CREATE TABLE `blocks` (
  `block_id` int(11) NOT NULL,
  `block_by` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `block_time` varchar(100) NOT NULL
);

CREATE TABLE `bookmarks` (
  `bkmrk_id` int(11) NOT NULL,
  `bkmrk_by` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `bkmrk_time` varchar(100) NOT NULL
);

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `type` enum('text','image','sticker') NOT NULL,
  `text` mediumtext NOT NULL,
  `commentSrc` mediumtext NOT NULL,
  `comment_by` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment_time` varchar(100) NOT NULL
);

CREATE TABLE `conversations` (
  `con_id` int(11) NOT NULL,
  `user_one` int(11) NOT NULL,
  `user_two` int(11) NOT NULL,
  `con_time` varchar(100) NOT NULL
);

CREATE TABLE `favourites` (
  `fav_id` int(11) NOT NULL,
  `fav_by` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `fav_time` varchar(100) NOT NULL
);

CREATE TABLE `follow_system` (
  `follow_id` int(11) NOT NULL,
  `follow_by` int(11) NOT NULL,
  `follow_by_username` varchar(32) NOT NULL,
  `follow_to` int(11) NOT NULL,
  `follow_to_username` varchar(32) NOT NULL,
  `follow_time` varchar(100) NOT NULL
);


CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `bio` varchar(2000) NOT NULL,
  `admin` int(11) NOT NULL,
  `group_type` enum('public','private') NOT NULL DEFAULT 'public',
  `created` varchar(100) NOT NULL
);

CREATE TABLE `group_members` (
  `grp_member_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `member` int(11) NOT NULL,
  `added_by` int(11) NOT NULL,
  `joined_group` varchar(100) NOT NULL
);

CREATE TABLE `hashtags` (
  `hashtag_id` int(11) NOT NULL,
  `hashtag` varchar(1000) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `hashtag_time` varchar(100) NOT NULL
);

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `like_by` int(11) NOT NULL,
  `like_time` varchar(100) NOT NULL
);

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `con_id` int(11) NOT NULL,
  `mssg_by` int(11) NOT NULL,
  `mssg_to` int(11) NOT NULL,
  `message` longtext NOT NULL,
  `type` enum('text','image','sticker') NOT NULL,
  `status` enum('read','unread') NOT NULL DEFAULT 'unread',
  `message_time` varchar(100) NOT NULL
);

CREATE TABLE `notifications` (
  `notify_id` int(11) NOT NULL,
  `notify_by` int(11) NOT NULL,
  `notify_to` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `type` enum('follow','tag','like','share','shared_your_post','comment','favourites','recommend','add_grp_member','invite','change_admin','new_con','mention_post','mention_comment') NOT NULL,
  `user` int(11) NOT NULL,
  `notify_time` varchar(100) NOT NULL,
  `status` enum('read','unread') NOT NULL DEFAULT 'unread'
);

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `imgSrc` mediumtext NOT NULL,
  `filter` varchar(100) NOT NULL DEFAULT 'normal',
  `location` mediumtext NOT NULL,
  `type` enum('user','group') NOT NULL DEFAULT 'user',
  `group_id` int(11) NOT NULL,
  `post_time` varchar(100) NOT NULL
);


CREATE TABLE `post_tags` (
  `post_tag_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user` int(11) NOT NULL
);

CREATE TABLE `profile_views` (
  `view_id` int(11) NOT NULL,
  `view_by` int(11) NOT NULL,
  `view_to` int(11) NOT NULL,
  `view_time` varchar(100) NOT NULL
);

CREATE TABLE `recommendations` (
  `recommend_id` int(11) NOT NULL,
  `recommend_by` int(11) NOT NULL,
  `recommend_to` int(11) NOT NULL,
  `recommend_of` int(11) NOT NULL,
  `recommend_time` varchar(100) NOT NULL
);

CREATE TABLE `shares` (
  `share_id` int(11) NOT NULL,
  `share_by` int(11) NOT NULL,
  `share_to` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `share_time` varchar(100) NOT NULL
);

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL
);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `surname` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` varchar(1000) NOT NULL DEFAULT '',
  `joined` varchar(100) NOT NULL DEFAULT '',
  `email_verified` enum('yes','no') NOT NULL DEFAULT 'no',
  `account_type` enum('public','private') NOT NULL DEFAULT 'public',
  `instagram` varchar(500) NOT NULL DEFAULT '',
  `twitter` varchar(500) NOT NULL DEFAULT '',
  `facebook` varchar(500) NOT NULL DEFAULT '',
  `github` varchar(500) NOT NULL DEFAULT '',
  `website` varchar(500) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  `isOnline` enum('yes','no') NOT NULL DEFAULT 'no',
  `lastOnline` varchar(100) NOT NULL DEFAULT ''
);

ALTER TABLE `blocks`
  ADD PRIMARY KEY (`block_id`);

ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`bkmrk_id`);

ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

ALTER TABLE `conversations`
  ADD PRIMARY KEY (`con_id`);

ALTER TABLE `favourites`
  ADD PRIMARY KEY (`fav_id`);

ALTER TABLE `follow_system`
  ADD PRIMARY KEY (`follow_id`);

ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

ALTER TABLE `group_members`
  ADD PRIMARY KEY (`grp_member_id`);

ALTER TABLE `hashtags`
  ADD PRIMARY KEY (`hashtag_id`);

ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notify_id`);

ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`post_tag_id`);

ALTER TABLE `profile_views`
  ADD PRIMARY KEY (`view_id`);

ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`recommend_id`);

ALTER TABLE `shares`
  ADD PRIMARY KEY (`share_id`);

ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `blocks`
  MODIFY `block_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `bookmarks`
  MODIFY `bkmrk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

ALTER TABLE `conversations`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

ALTER TABLE `favourites`
  MODIFY `fav_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `follow_system`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=304;

ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `group_members`
  MODIFY `grp_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

ALTER TABLE `hashtags`
  MODIFY `hashtag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

ALTER TABLE `notifications`
  MODIFY `notify_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=633;

ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

ALTER TABLE `post_tags`
  MODIFY `post_tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `profile_views`
  MODIFY `view_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=470;

ALTER TABLE `recommendations`
  MODIFY `recommend_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `shares`
  MODIFY `share_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;