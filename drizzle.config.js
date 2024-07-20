/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgresql://neondb_owner:18hgZeOIzpwd@ep-crimson-surf-a5b814w3.us-east-2.aws.neon.tech/interview?sslmode=require",
    }
};
