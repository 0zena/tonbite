using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tonbite.Api.Migrations
{
    /// <inheritdoc />
    public partial class EntityOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_Users_UserId",
                table: "RefreshTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Users_UserId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "IsRevoked",
                table: "RefreshTokens");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Roles",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Roles_UserId",
                table: "Roles",
                newName: "IX_Roles_OwnerId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "RefreshTokens",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                newName: "IX_RefreshTokens_OwnerId");

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "Courses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_Users_OwnerId",
                table: "RefreshTokens",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Users_OwnerId",
                table: "Roles",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_Users_OwnerId",
                table: "RefreshTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Users_OwnerId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Roles",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Roles_OwnerId",
                table: "Roles",
                newName: "IX_Roles_UserId");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "RefreshTokens",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_RefreshTokens_OwnerId",
                table: "RefreshTokens",
                newName: "IX_RefreshTokens_UserId");

            migrationBuilder.AddColumn<bool>(
                name: "IsRevoked",
                table: "RefreshTokens",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_Users_UserId",
                table: "RefreshTokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Users_UserId",
                table: "Roles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
