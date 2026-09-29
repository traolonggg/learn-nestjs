import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailToUser1790671693782 implements MigrationInterface {
    name = 'AddEmailToUser1790671693782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
        await queryRunner.query(`CREATE INDEX "idx_todo_priority_high" ON "todo"  ("priority") WHERE "priority= HIGH"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_todo_priority_high"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
