CREATE TABLE `list` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`title` text,
	`color` text,
	`icon` text,
	`isFavorite` integer DEFAULT false,
	`sortKey` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `listItem` (
	`id` text PRIMARY KEY NOT NULL,
	`listId` text,
	`title` text,
	`subtitle` text,
	`description` text,
	`priority` integer,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`listId`) REFERENCES `list`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`password` text,
	`hasSubmittedReview` integer DEFAULT false,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
