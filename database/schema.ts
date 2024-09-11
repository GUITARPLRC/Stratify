import { relations, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import uuid from "react-native-uuid"

export type User = {
	id: string
	name: string | null
	email: string | null
	password: string | null
	hasSubmittedReview: boolean
	createdAt: string
}

export type List = {
	id: string
	userId: string
	title: string | null
	sortKey: string
	isFavorite: boolean | null
	createdAt: string
	color: string | null
	icon: string | null
}

export type ListItem = {
	id: string
	listId: string
	title: string | null
	subtitle: string | null
	description: string | null
	priority: number | null
	createdAt: string
}

export const user = sqliteTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	name: text("name"),
	email: text("email"),
	password: text("password"),
	hasSubmittedReview: integer("hasSubmittedReview", { mode: "boolean" }).default(false),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(current_timestamp)`),
})

export const list = sqliteTable("list", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	title: text("title"),
	color: text("color"),
	icon: text("icon"),
	isFavorite: integer("isFavorite", { mode: "boolean" }).default(false),
	sortKey: text("sortKey")
		.notNull()
		.$defaultFn(() => "createdAt"),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(current_timestamp)`),
})

export const listItem = sqliteTable("listItem", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuid.v4().toString()),
	listId: text("listId").references(() => list.id),
	title: text("title"),
	subtitle: text("subtitle"),
	description: text("description"),
	priority: integer("priority"),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(current_timestamp)`),
})

// Define relations
export const userRelations = relations(user, ({ many }) => ({
	lists: many(list),
}))

export const listsRelations = relations(list, ({ one, many }) => ({
	user: one(user, {
		fields: [list.userId],
		references: [user.id],
	}),
	listItems: many(listItem),
}))

export const listItemsRelations = relations(listItem, ({ one }) => ({
	list: one(list, {
		fields: [listItem.listId],
		references: [list.id],
	}),
}))
