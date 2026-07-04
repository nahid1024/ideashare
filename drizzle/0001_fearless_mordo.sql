CREATE INDEX "user_email_index" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "tags_name_index" ON "tags" USING btree ("name");