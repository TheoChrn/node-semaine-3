ALTER TABLE "funitures" RENAME TO "furnitures";--> statement-breakpoint
ALTER TABLE "furnitures" DROP CONSTRAINT "funitures_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "furnitures" DROP CONSTRAINT "funitures_type_id_furniture_types_id_fk";
--> statement-breakpoint
ALTER TABLE "furnitures" ADD CONSTRAINT "furnitures_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "furnitures" ADD CONSTRAINT "furnitures_type_id_furniture_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."furniture_types"("id") ON DELETE cascade ON UPDATE no action;