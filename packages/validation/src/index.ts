import { z } from "zod";

export type EnvironmentInput = Readonly<Record<string, string | undefined>>;

const optionalDatabaseEnvironment = z.object({
  DATABASE_URL: z.url().optional(),
});

export type DatabaseEnvironment = z.infer<typeof optionalDatabaseEnvironment>;

export function parseDatabaseEnvironment(
  environment: EnvironmentInput,
): DatabaseEnvironment {
  return optionalDatabaseEnvironment.parse(environment);
}
