import { z } from "zod";

const optionalDatabaseEnvironment = z.object({
  DATABASE_URL: z.url().optional(),
});

export type DatabaseEnvironment = z.infer<typeof optionalDatabaseEnvironment>;

export function parseDatabaseEnvironment(
  environment: NodeJS.ProcessEnv,
): DatabaseEnvironment {
  return optionalDatabaseEnvironment.parse(environment);
}
