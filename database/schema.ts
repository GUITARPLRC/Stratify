import { relations, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import uuid from "react-native-uuid"

export type User = {
	id: string
	name: string | null
	email: string | null
	password: string | null
	avatar: string | null
	avatarTypeId: number | null
	hasSubmittedReview: boolean | null
}

export type List = {
	id: string
	userId: string
	title: string
	description: string
	sortKey: string
	theme: string
	createdAt: string
}

export type ListItem = {
	id: string
	listId: string
	description: string
	priority: number
	createdAt: string
}

export type Badge = {
	id: string
	type: string
	userId: string
	badgeTypeId: number
	createdAt: string
}

export type BadgeType = {
	id: number
	type: string
}

export type AvatarType = {
	id: number
	type: string
}

export const user = sqliteTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	name: text("name", { length: 255 }),
	email: text("email", { length: 255 }),
	password: text("password", { length: 255 }),
	avatar: text("avatar", { length: 255 }),
	avatarTypeId: integer("avatarTypeId").references(() => avatarTypes.id),
	hasSubmittedReview: integer("hasSubmittedReview", { mode: "boolean" }),
})

export const lists = sqliteTable("lists", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	userId: text("userId").references(() => user.id),
	title: text("title", { length: 255 }),
	description: text("description", { length: 255 }),
	sortKey: text("sortKey", { length: 255 }),
	theme: text("theme", { length: 255 }),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(current_timestamp)`),
})

export const listItems = sqliteTable("listItems", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	listId: text("listId").references(() => lists.id),
	description: text("description", { length: 255 }),
	priority: integer("priority"),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(current_timestamp)`),
})

export const badges = sqliteTable("badges", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	type: text("name", { length: 255 }),
	userId: text("userId").references(() => user.id),
	badgeTypeId: integer("badgeTypeId").references(() => badgeTypes.id),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(current_timestamp)`),
})

export const badgeTypes = sqliteTable("badgeTypes", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	type: text("type", { length: 255 }),
})

export const avatarTypes = sqliteTable("avatarTypes", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	type: text("type", { length: 255 }),
})

// Define relations
export const userRelations = relations(user, ({ one, many }) => ({
	lists: many(lists),
	badges: many(badges),
	avatarType: one(avatarTypes, {
		fields: [user.avatarTypeId],
		references: [avatarTypes.id],
	}),
}))

export const listsRelations = relations(lists, ({ one, many }) => ({
	user: one(user, {
		fields: [lists.userId],
		references: [user.id],
	}),
	listItems: many(listItems),
}))

export const listItemsRelations = relations(listItems, ({ one }) => ({
	list: one(lists, {
		fields: [listItems.listId],
		references: [lists.id],
	}),
}))

export const badgesRelations = relations(badges, ({ one }) => ({
	user: one(user, {
		fields: [badges.userId],
		references: [user.id],
	}),
	badgeType: one(badgeTypes, {
		fields: [badges.badgeTypeId],
		references: [badgeTypes.id],
	}),
}))

export const badgeTypesRelations = relations(badgeTypes, ({ many }) => ({
	badges: many(badges),
}))

export const avatarTypesRelations = relations(avatarTypes, ({ many }) => ({
	users: many(user),
}))
