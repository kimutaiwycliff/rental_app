import { pgTable, text, timestamp, boolean, pgEnum, integer, serial, real, json } from "drizzle-orm/pg-core";

// Enums
export const highlightEnum = pgEnum('highlight', [
  'HighSpeedInternetAccess',
  'WasherDryer',
  'AirConditioning',
  'Heating',
  'SmokeFree',
  'CableReady',
  'SatelliteTV',
  'DoubleVanities',
  'TubShower',
  'Intercom',
  'SprinklerSystem',
  'RecentlyRenovated',
  'CloseToTransit',
  'GreatView',
  'QuietNeighborhood'
]);

export const amenityEnum = pgEnum('amenity', [
  'WasherDryer',
  'AirConditioning',
  'Dishwasher',
  'HighSpeedInternet',
  'HardwoodFloors',
  'WalkInClosets',
  'Microwave',
  'Refrigerator',
  'Pool',
  'Gym',
  'Parking',
  'PetsAllowed',
  'WiFi'
]);

export const propertyTypeEnum = pgEnum('property_type', [
  'Rooms',
  'Tinyhouse',
  'Apartment',
  'Villa',
  'Townhouse',
  'Cottage'
]);

export const applicationStatusEnum = pgEnum('application_status', [
  'Pending',
  'Denied',
  'Approved'
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'Pending',
  'Paid',
  'PartiallyPaid',
  'Overdue'
]);

export const roleEnum = pgEnum('role', [ 'manager', 'tenant']);

//TABLES

//AUTH SCHEMA FROM BETTER AUTH
export const user = pgTable("user", {
					id: text('id').primaryKey(),
					name: text('name').notNull(),
 email: text('email').notNull().unique(),
 emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
 image: text('image'),
 role: roleEnum('role').default('manager').notNull(),
 phoneNumber: text('phone_number'),
 createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
 updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
				});

export const session = pgTable("session", {
					id: text('id').primaryKey(),
					expiresAt: timestamp('expires_at').notNull(),
 token: text('token').notNull().unique(),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull(),
 ipAddress: text('ip_address'),
 userAgent: text('user_agent'),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
				});

export const account = pgTable("account", {
					id: text('id').primaryKey(),
					accountId: text('account_id').notNull(),
 providerId: text('provider_id').notNull(),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
 accessToken: text('access_token'),
 refreshToken: text('refresh_token'),
 idToken: text('id_token'),
 accessTokenExpiresAt: timestamp('access_token_expires_at'),
 refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
 scope: text('scope'),
 password: text('password'),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull()
				});

export const verification = pgTable("verification", {
					id: text('id').primaryKey(),
					identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expires_at').notNull(),
 createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
 updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
				});

//END OF BETTER AUTH

//NEW TABLES

export const location = pgTable("location", {
  id: serial('id').primaryKey(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  country: text('country').notNull(),
  postalCode: text('postal_code').notNull(),
  coordinates: text('coordinates').$type<any>().notNull()
});

export const property = pgTable("property", {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  pricePerMonth: real('price_per_month').notNull(),
  securityDeposit: real('security_deposit').notNull(),
  applicationFee: real('application_fee').notNull(),
  photoUrls: json('photo_urls').$type<string[]>().notNull(),
  amenities: json('amenities').$type<string[]>().notNull(),
  highlights: json('highlights').$type<string[]>().notNull(),
  isPetsAllowed: boolean('is_pets_allowed').default(false).notNull(),
  isParkingIncluded: boolean('is_parking_included').default(false).notNull(),
  beds: integer('beds').notNull(),
  baths: real('baths').notNull(),
  squareFeet: integer('square_feet').notNull(),
  propertyType: propertyTypeEnum('property_type').notNull(),
  postedDate: timestamp('posted_date').defaultNow().notNull(),
  averageRating: real('average_rating').default(0),
  numberOfReviews: integer('number_of_reviews').default(0),
  locationId: integer('location_id').notNull().references(() => location.id),
  managerId: text('manager_id').notNull().references(() => user.id)
});

export const application = pgTable("application", {
  id: serial('id').primaryKey(),
  applicationDate: timestamp('application_date').notNull(),
  status: applicationStatusEnum('status').notNull(),
  propertyId: integer('property_id').notNull().references(() => property.id),
  tenantId: text('tenant_id').notNull().references(() => user.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  message: text('message'),
  leaseId: integer('lease_id').unique().references(() => lease.id)
});

export const lease = pgTable("lease", {
  id: serial('id').primaryKey(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  rent: real('rent').notNull(),
  deposit: real('deposit').notNull(),
  propertyId: integer('property_id').notNull().references(() => property.id),
  tenantId: text('tenant_id').notNull().references(() => user.id)
});

export const payment = pgTable("payment", {
  id: serial('id').primaryKey(),
  amountDue: real('amount_due').notNull(),
  amountPaid: real('amount_paid').notNull(),
  dueDate: timestamp('due_date').notNull(),
  paymentDate: timestamp('payment_date').notNull(),
  paymentStatus: paymentStatusEnum('payment_status').notNull(),
  leaseId: integer('lease_id').notNull().references(() => lease.id)
});

// Junction tables for many-to-many relationships
export const tenantFavorites = pgTable("tenant_favorites", {
  tenantId: text('tenant_id').notNull().references(() => user.id),
  propertyId: integer('property_id').notNull().references(() => property.id)
});

export const tenantProperties = pgTable("tenant_properties", {
  tenantId: text('tenant_id').notNull().references(() => user.id),
  propertyId: integer('property_id').notNull().references(() => property.id)
});
