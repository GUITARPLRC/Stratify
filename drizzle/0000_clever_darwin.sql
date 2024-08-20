CREATE TABLE `avatarTypes` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text(255)
);
--> statement-breakpoint
CREATE TABLE `badgeTypes` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text(255)
);
--> statement-breakpoint
CREATE TABLE `badges` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(255),
	`userId` text,
	`badgeTypeId` integer,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`badgeTypeId`) REFERENCES `badgeTypes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `listItems` (
	`id` text PRIMARY KEY NOT NULL,
	`listId` text,
	`description` text(255),
	`priority` integer,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`listId`) REFERENCES `lists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`title` text(255),
	`description` text(255),
	`sortKey` text(255),
	`theme` text(255),
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255),
	`password` text(255),
	`avatar` text(255),
	`avatarTypeId` integer,
	`hasSubmittedReview` integer,
	FOREIGN KEY (`avatarTypeId`) REFERENCES `avatarTypes`(`id`) ON UPDATE no action ON DELETE no action
);
