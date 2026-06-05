
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Transfer
 * 
 */
export type Transfer = $Result.DefaultSelection<Prisma.$TransferPayload>
/**
 * Model TopUp
 * 
 */
export type TopUp = $Result.DefaultSelection<Prisma.$TopUpPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model UserSession
 * 
 */
export type UserSession = $Result.DefaultSelection<Prisma.$UserSessionPayload>
/**
 * Model SystemSetting
 * 
 */
export type SystemSetting = $Result.DefaultSelection<Prisma.$SystemSettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Currency: {
  VND: 'VND',
  USD: 'USD'
};

export type Currency = (typeof Currency)[keyof typeof Currency]


export const TransactionStatus: {
  pending: 'pending',
  success: 'success',
  failed: 'failed',
  cancelled: 'cancelled'
};

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus]


export const TransactionType: {
  deposit: 'deposit',
  withdraw: 'withdraw',
  transfer: 'transfer',
  payment: 'payment',
  refund: 'refund'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const UserRole: {
  customer: 'customer',
  admin: 'admin',
  support: 'support'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AdminRole: {
  super_admin: 'super_admin',
  operator: 'operator',
  support: 'support',
  finance: 'finance'
};

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole]


export const PaymentType: {
  bill: 'bill',
  merchant: 'merchant',
  subscription: 'subscription'
};

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType]


export const TopUpMethod: {
  bank_transfer: 'bank_transfer',
  credit_card: 'credit_card',
  debit_card: 'debit_card',
  voucher: 'voucher'
};

export type TopUpMethod = (typeof TopUpMethod)[keyof typeof TopUpMethod]


export const NotificationType: {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

}

export type Currency = $Enums.Currency

export const Currency: typeof $Enums.Currency

export type TransactionStatus = $Enums.TransactionStatus

export const TransactionStatus: typeof $Enums.TransactionStatus

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AdminRole = $Enums.AdminRole

export const AdminRole: typeof $Enums.AdminRole

export type PaymentType = $Enums.PaymentType

export const PaymentType: typeof $Enums.PaymentType

export type TopUpMethod = $Enums.TopUpMethod

export const TopUpMethod: typeof $Enums.TopUpMethod

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transfer`: Exposes CRUD operations for the **Transfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transfers
    * const transfers = await prisma.transfer.findMany()
    * ```
    */
  get transfer(): Prisma.TransferDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.topUp`: Exposes CRUD operations for the **TopUp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TopUps
    * const topUps = await prisma.topUp.findMany()
    * ```
    */
  get topUp(): Prisma.TopUpDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSession`: Exposes CRUD operations for the **UserSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSessions
    * const userSessions = await prisma.userSession.findMany()
    * ```
    */
  get userSession(): Prisma.UserSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemSettings
    * const systemSettings = await prisma.systemSetting.findMany()
    * ```
    */
  get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Wallet: 'Wallet',
    Transaction: 'Transaction',
    Transfer: 'Transfer',
    TopUp: 'TopUp',
    Payment: 'Payment',
    Notification: 'Notification',
    Admin: 'Admin',
    UserSession: 'UserSession',
    SystemSetting: 'SystemSetting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "wallet" | "transaction" | "transfer" | "topUp" | "payment" | "notification" | "admin" | "userSession" | "systemSetting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Transfer: {
        payload: Prisma.$TransferPayload<ExtArgs>
        fields: Prisma.TransferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          findFirst: {
            args: Prisma.TransferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          findMany: {
            args: Prisma.TransferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>[]
          }
          create: {
            args: Prisma.TransferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          createMany: {
            args: Prisma.TransferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>[]
          }
          delete: {
            args: Prisma.TransferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          update: {
            args: Prisma.TransferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          deleteMany: {
            args: Prisma.TransferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>[]
          }
          upsert: {
            args: Prisma.TransferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          aggregate: {
            args: Prisma.TransferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransfer>
          }
          groupBy: {
            args: Prisma.TransferGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransferGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransferCountArgs<ExtArgs>
            result: $Utils.Optional<TransferCountAggregateOutputType> | number
          }
        }
      }
      TopUp: {
        payload: Prisma.$TopUpPayload<ExtArgs>
        fields: Prisma.TopUpFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TopUpFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TopUpFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>
          }
          findFirst: {
            args: Prisma.TopUpFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TopUpFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>
          }
          findMany: {
            args: Prisma.TopUpFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>[]
          }
          create: {
            args: Prisma.TopUpCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>
          }
          createMany: {
            args: Prisma.TopUpCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TopUpCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>[]
          }
          delete: {
            args: Prisma.TopUpDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>
          }
          update: {
            args: Prisma.TopUpUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>
          }
          deleteMany: {
            args: Prisma.TopUpDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TopUpUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TopUpUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>[]
          }
          upsert: {
            args: Prisma.TopUpUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopUpPayload>
          }
          aggregate: {
            args: Prisma.TopUpAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTopUp>
          }
          groupBy: {
            args: Prisma.TopUpGroupByArgs<ExtArgs>
            result: $Utils.Optional<TopUpGroupByOutputType>[]
          }
          count: {
            args: Prisma.TopUpCountArgs<ExtArgs>
            result: $Utils.Optional<TopUpCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      UserSession: {
        payload: Prisma.$UserSessionPayload<ExtArgs>
        fields: Prisma.UserSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findFirst: {
            args: Prisma.UserSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findMany: {
            args: Prisma.UserSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          create: {
            args: Prisma.UserSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          createMany: {
            args: Prisma.UserSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          delete: {
            args: Prisma.UserSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          update: {
            args: Prisma.UserSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          deleteMany: {
            args: Prisma.UserSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          upsert: {
            args: Prisma.UserSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          aggregate: {
            args: Prisma.UserSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSession>
          }
          groupBy: {
            args: Prisma.UserSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UserSessionCountAggregateOutputType> | number
          }
        }
      }
      SystemSetting: {
        payload: Prisma.$SystemSettingPayload<ExtArgs>
        fields: Prisma.SystemSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findFirst: {
            args: Prisma.SystemSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findMany: {
            args: Prisma.SystemSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          create: {
            args: Prisma.SystemSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          createMany: {
            args: Prisma.SystemSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          delete: {
            args: Prisma.SystemSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          update: {
            args: Prisma.SystemSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          deleteMany: {
            args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          upsert: {
            args: Prisma.SystemSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          aggregate: {
            args: Prisma.SystemSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemSetting>
          }
          groupBy: {
            args: Prisma.SystemSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    wallet?: WalletOmit
    transaction?: TransactionOmit
    transfer?: TransferOmit
    topUp?: TopUpOmit
    payment?: PaymentOmit
    notification?: NotificationOmit
    admin?: AdminOmit
    userSession?: UserSessionOmit
    systemSetting?: SystemSettingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    wallets: number
    transactions: number
    transfersSent: number
    transfersRecv: number
    topUps: number
    payments: number
    notifications: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallets?: boolean | UserCountOutputTypeCountWalletsArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    transfersSent?: boolean | UserCountOutputTypeCountTransfersSentArgs
    transfersRecv?: boolean | UserCountOutputTypeCountTransfersRecvArgs
    topUps?: boolean | UserCountOutputTypeCountTopUpsArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransfersSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransfersRecvArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTopUpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TopUpWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
  }


  /**
   * Count Type WalletCountOutputType
   */

  export type WalletCountOutputType = {
    transactions: number
    transfersFrom: number
    transfersTo: number
    topUps: number
    payments: number
  }

  export type WalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | WalletCountOutputTypeCountTransactionsArgs
    transfersFrom?: boolean | WalletCountOutputTypeCountTransfersFromArgs
    transfersTo?: boolean | WalletCountOutputTypeCountTransfersToArgs
    topUps?: boolean | WalletCountOutputTypeCountTopUpsArgs
    payments?: boolean | WalletCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletCountOutputType
     */
    select?: WalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTransfersFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTransfersToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTopUpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TopUpWhereInput
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    phoneNumber: string | null
    name: string | null
    avatar: string | null
    role: $Enums.UserRole | null
    isEmailVerified: boolean | null
    isPhoneVerified: boolean | null
    lastLoginAt: Date | null
    twoFactorEnabled: boolean | null
    twoFactorSecret: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phoneNumber: string | null
    name: string | null
    avatar: string | null
    role: $Enums.UserRole | null
    isEmailVerified: boolean | null
    isPhoneVerified: boolean | null
    lastLoginAt: Date | null
    twoFactorEnabled: boolean | null
    twoFactorSecret: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    phoneNumber: number
    name: number
    avatar: number
    role: number
    isEmailVerified: number
    isPhoneVerified: number
    lastLoginAt: number
    twoFactorEnabled: number
    twoFactorSecret: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    phoneNumber?: true
    name?: true
    avatar?: true
    role?: true
    isEmailVerified?: true
    isPhoneVerified?: true
    lastLoginAt?: true
    twoFactorEnabled?: true
    twoFactorSecret?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    phoneNumber?: true
    name?: true
    avatar?: true
    role?: true
    isEmailVerified?: true
    isPhoneVerified?: true
    lastLoginAt?: true
    twoFactorEnabled?: true
    twoFactorSecret?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    phoneNumber?: true
    name?: true
    avatar?: true
    role?: true
    isEmailVerified?: true
    isPhoneVerified?: true
    lastLoginAt?: true
    twoFactorEnabled?: true
    twoFactorSecret?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    phoneNumber: string | null
    name: string
    avatar: string | null
    role: $Enums.UserRole
    isEmailVerified: boolean
    isPhoneVerified: boolean
    lastLoginAt: Date | null
    twoFactorEnabled: boolean | null
    twoFactorSecret: string | null
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phoneNumber?: boolean
    name?: boolean
    avatar?: boolean
    role?: boolean
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: boolean
    twoFactorEnabled?: boolean
    twoFactorSecret?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    wallets?: boolean | User$walletsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    transfersSent?: boolean | User$transfersSentArgs<ExtArgs>
    transfersRecv?: boolean | User$transfersRecvArgs<ExtArgs>
    topUps?: boolean | User$topUpsArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    adminProfile?: boolean | User$adminProfileArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phoneNumber?: boolean
    name?: boolean
    avatar?: boolean
    role?: boolean
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: boolean
    twoFactorEnabled?: boolean
    twoFactorSecret?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phoneNumber?: boolean
    name?: boolean
    avatar?: boolean
    role?: boolean
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: boolean
    twoFactorEnabled?: boolean
    twoFactorSecret?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    phoneNumber?: boolean
    name?: boolean
    avatar?: boolean
    role?: boolean
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: boolean
    twoFactorEnabled?: boolean
    twoFactorSecret?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phoneNumber" | "name" | "avatar" | "role" | "isEmailVerified" | "isPhoneVerified" | "lastLoginAt" | "twoFactorEnabled" | "twoFactorSecret" | "passwordHash" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallets?: boolean | User$walletsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    transfersSent?: boolean | User$transfersSentArgs<ExtArgs>
    transfersRecv?: boolean | User$transfersRecvArgs<ExtArgs>
    topUps?: boolean | User$topUpsArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    adminProfile?: boolean | User$adminProfileArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      wallets: Prisma.$WalletPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      transfersSent: Prisma.$TransferPayload<ExtArgs>[]
      transfersRecv: Prisma.$TransferPayload<ExtArgs>[]
      topUps: Prisma.$TopUpPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      adminProfile: Prisma.$AdminPayload<ExtArgs> | null
      sessions: Prisma.$UserSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      phoneNumber: string | null
      name: string
      avatar: string | null
      role: $Enums.UserRole
      isEmailVerified: boolean
      isPhoneVerified: boolean
      lastLoginAt: Date | null
      twoFactorEnabled: boolean | null
      twoFactorSecret: string | null
      passwordHash: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallets<T extends User$walletsArgs<ExtArgs> = {}>(args?: Subset<T, User$walletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersSent<T extends User$transfersSentArgs<ExtArgs> = {}>(args?: Subset<T, User$transfersSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersRecv<T extends User$transfersRecvArgs<ExtArgs> = {}>(args?: Subset<T, User$transfersRecvArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    topUps<T extends User$topUpsArgs<ExtArgs> = {}>(args?: Subset<T, User$topUpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    adminProfile<T extends User$adminProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$adminProfileArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly isPhoneVerified: FieldRef<"User", 'Boolean'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly twoFactorEnabled: FieldRef<"User", 'Boolean'>
    readonly twoFactorSecret: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.wallets
   */
  export type User$walletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    cursor?: WalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.transfersSent
   */
  export type User$transfersSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    cursor?: TransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * User.transfersRecv
   */
  export type User$transfersRecvArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    cursor?: TransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * User.topUps
   */
  export type User$topUpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    where?: TopUpWhereInput
    orderBy?: TopUpOrderByWithRelationInput | TopUpOrderByWithRelationInput[]
    cursor?: TopUpWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TopUpScalarFieldEnum | TopUpScalarFieldEnum[]
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.adminProfile
   */
  export type User$adminProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    cursor?: UserSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletAvgAggregateOutputType = {
    balance: number | null
    dailyLimit: number | null
    monthlyLimit: number | null
    currentDailyUsage: number | null
    currentMonthlyUsage: number | null
  }

  export type WalletSumAggregateOutputType = {
    balance: number | null
    dailyLimit: number | null
    monthlyLimit: number | null
    currentDailyUsage: number | null
    currentMonthlyUsage: number | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: number | null
    currency: $Enums.Currency | null
    accountNumber: string | null
    isActive: boolean | null
    dailyLimit: number | null
    monthlyLimit: number | null
    currentDailyUsage: number | null
    currentMonthlyUsage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: number | null
    currency: $Enums.Currency | null
    accountNumber: string | null
    isActive: boolean | null
    dailyLimit: number | null
    monthlyLimit: number | null
    currentDailyUsage: number | null
    currentMonthlyUsage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    userId: number
    balance: number
    currency: number
    accountNumber: number
    isActive: number
    dailyLimit: number
    monthlyLimit: number
    currentDailyUsage: number
    currentMonthlyUsage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WalletAvgAggregateInputType = {
    balance?: true
    dailyLimit?: true
    monthlyLimit?: true
    currentDailyUsage?: true
    currentMonthlyUsage?: true
  }

  export type WalletSumAggregateInputType = {
    balance?: true
    dailyLimit?: true
    monthlyLimit?: true
    currentDailyUsage?: true
    currentMonthlyUsage?: true
  }

  export type WalletMinAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    accountNumber?: true
    isActive?: true
    dailyLimit?: true
    monthlyLimit?: true
    currentDailyUsage?: true
    currentMonthlyUsage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    accountNumber?: true
    isActive?: true
    dailyLimit?: true
    monthlyLimit?: true
    currentDailyUsage?: true
    currentMonthlyUsage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    accountNumber?: true
    isActive?: true
    dailyLimit?: true
    monthlyLimit?: true
    currentDailyUsage?: true
    currentMonthlyUsage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _avg?: WalletAvgAggregateInputType
    _sum?: WalletSumAggregateInputType
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    userId: string
    balance: number
    currency: $Enums.Currency
    accountNumber: string
    isActive: boolean
    dailyLimit: number | null
    monthlyLimit: number | null
    currentDailyUsage: number | null
    currentMonthlyUsage: number | null
    createdAt: Date
    updatedAt: Date
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    accountNumber?: boolean
    isActive?: boolean
    dailyLimit?: boolean
    monthlyLimit?: boolean
    currentDailyUsage?: boolean
    currentMonthlyUsage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    transfersFrom?: boolean | Wallet$transfersFromArgs<ExtArgs>
    transfersTo?: boolean | Wallet$transfersToArgs<ExtArgs>
    topUps?: boolean | Wallet$topUpsArgs<ExtArgs>
    payments?: boolean | Wallet$paymentsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    accountNumber?: boolean
    isActive?: boolean
    dailyLimit?: boolean
    monthlyLimit?: boolean
    currentDailyUsage?: boolean
    currentMonthlyUsage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    accountNumber?: boolean
    isActive?: boolean
    dailyLimit?: boolean
    monthlyLimit?: boolean
    currentDailyUsage?: boolean
    currentMonthlyUsage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    accountNumber?: boolean
    isActive?: boolean
    dailyLimit?: boolean
    monthlyLimit?: boolean
    currentDailyUsage?: boolean
    currentMonthlyUsage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "balance" | "currency" | "accountNumber" | "isActive" | "dailyLimit" | "monthlyLimit" | "currentDailyUsage" | "currentMonthlyUsage" | "createdAt" | "updatedAt", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    transfersFrom?: boolean | Wallet$transfersFromArgs<ExtArgs>
    transfersTo?: boolean | Wallet$transfersToArgs<ExtArgs>
    topUps?: boolean | Wallet$topUpsArgs<ExtArgs>
    payments?: boolean | Wallet$paymentsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      transfersFrom: Prisma.$TransferPayload<ExtArgs>[]
      transfersTo: Prisma.$TransferPayload<ExtArgs>[]
      topUps: Prisma.$TopUpPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      balance: number
      currency: $Enums.Currency
      accountNumber: string
      isActive: boolean
      dailyLimit: number | null
      monthlyLimit: number | null
      currentDailyUsage: number | null
      currentMonthlyUsage: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Wallet$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersFrom<T extends Wallet$transfersFromArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$transfersFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersTo<T extends Wallet$transfersToArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$transfersToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    topUps<T extends Wallet$topUpsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$topUpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Wallet$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly userId: FieldRef<"Wallet", 'String'>
    readonly balance: FieldRef<"Wallet", 'Int'>
    readonly currency: FieldRef<"Wallet", 'Currency'>
    readonly accountNumber: FieldRef<"Wallet", 'String'>
    readonly isActive: FieldRef<"Wallet", 'Boolean'>
    readonly dailyLimit: FieldRef<"Wallet", 'Int'>
    readonly monthlyLimit: FieldRef<"Wallet", 'Int'>
    readonly currentDailyUsage: FieldRef<"Wallet", 'Int'>
    readonly currentMonthlyUsage: FieldRef<"Wallet", 'Int'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet.transactions
   */
  export type Wallet$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Wallet.transfersFrom
   */
  export type Wallet$transfersFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    cursor?: TransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Wallet.transfersTo
   */
  export type Wallet$transfersToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    cursor?: TransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Wallet.topUps
   */
  export type Wallet$topUpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    where?: TopUpWhereInput
    orderBy?: TopUpOrderByWithRelationInput | TopUpOrderByWithRelationInput[]
    cursor?: TopUpWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TopUpScalarFieldEnum | TopUpScalarFieldEnum[]
  }

  /**
   * Wallet.payments
   */
  export type Wallet$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
    fee: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
    fee: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    walletId: string | null
    fromWalletId: string | null
    toWalletId: string | null
    referenceCode: string | null
    failureReason: string | null
    recipientName: string | null
    senderName: string | null
    type: $Enums.TransactionType | null
    status: $Enums.TransactionStatus | null
    amount: number | null
    fee: number | null
    currency: $Enums.Currency | null
    referenceId: string | null
    description: string | null
    completedAt: Date | null
    cancelledAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    walletId: string | null
    fromWalletId: string | null
    toWalletId: string | null
    referenceCode: string | null
    failureReason: string | null
    recipientName: string | null
    senderName: string | null
    type: $Enums.TransactionType | null
    status: $Enums.TransactionStatus | null
    amount: number | null
    fee: number | null
    currency: $Enums.Currency | null
    referenceId: string | null
    description: string | null
    completedAt: Date | null
    cancelledAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    userId: number
    walletId: number
    fromWalletId: number
    toWalletId: number
    referenceCode: number
    failureReason: number
    recipientName: number
    senderName: number
    type: number
    status: number
    amount: number
    fee: number
    currency: number
    referenceId: number
    description: number
    metadata: number
    completedAt: number
    cancelledAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    fee?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    fee?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    fromWalletId?: true
    toWalletId?: true
    referenceCode?: true
    failureReason?: true
    recipientName?: true
    senderName?: true
    type?: true
    status?: true
    amount?: true
    fee?: true
    currency?: true
    referenceId?: true
    description?: true
    completedAt?: true
    cancelledAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    fromWalletId?: true
    toWalletId?: true
    referenceCode?: true
    failureReason?: true
    recipientName?: true
    senderName?: true
    type?: true
    status?: true
    amount?: true
    fee?: true
    currency?: true
    referenceId?: true
    description?: true
    completedAt?: true
    cancelledAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    fromWalletId?: true
    toWalletId?: true
    referenceCode?: true
    failureReason?: true
    recipientName?: true
    senderName?: true
    type?: true
    status?: true
    amount?: true
    fee?: true
    currency?: true
    referenceId?: true
    description?: true
    metadata?: true
    completedAt?: true
    cancelledAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    userId: string
    walletId: string
    fromWalletId: string | null
    toWalletId: string | null
    referenceCode: string | null
    failureReason: string | null
    recipientName: string | null
    senderName: string | null
    type: $Enums.TransactionType
    status: $Enums.TransactionStatus
    amount: number
    fee: number | null
    currency: $Enums.Currency
    referenceId: string | null
    description: string | null
    metadata: JsonValue | null
    completedAt: Date | null
    cancelledAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    fromWalletId?: boolean
    toWalletId?: boolean
    referenceCode?: boolean
    failureReason?: boolean
    recipientName?: boolean
    senderName?: boolean
    type?: boolean
    status?: boolean
    amount?: boolean
    fee?: boolean
    currency?: boolean
    referenceId?: boolean
    description?: boolean
    metadata?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    fromWalletId?: boolean
    toWalletId?: boolean
    referenceCode?: boolean
    failureReason?: boolean
    recipientName?: boolean
    senderName?: boolean
    type?: boolean
    status?: boolean
    amount?: boolean
    fee?: boolean
    currency?: boolean
    referenceId?: boolean
    description?: boolean
    metadata?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    fromWalletId?: boolean
    toWalletId?: boolean
    referenceCode?: boolean
    failureReason?: boolean
    recipientName?: boolean
    senderName?: boolean
    type?: boolean
    status?: boolean
    amount?: boolean
    fee?: boolean
    currency?: boolean
    referenceId?: boolean
    description?: boolean
    metadata?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    walletId?: boolean
    fromWalletId?: boolean
    toWalletId?: boolean
    referenceCode?: boolean
    failureReason?: boolean
    recipientName?: boolean
    senderName?: boolean
    type?: boolean
    status?: boolean
    amount?: boolean
    fee?: boolean
    currency?: boolean
    referenceId?: boolean
    description?: boolean
    metadata?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "walletId" | "fromWalletId" | "toWalletId" | "referenceCode" | "failureReason" | "recipientName" | "senderName" | "type" | "status" | "amount" | "fee" | "currency" | "referenceId" | "description" | "metadata" | "completedAt" | "cancelledAt" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      wallet: Prisma.$WalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      walletId: string
      fromWalletId: string | null
      toWalletId: string | null
      referenceCode: string | null
      failureReason: string | null
      recipientName: string | null
      senderName: string | null
      type: $Enums.TransactionType
      status: $Enums.TransactionStatus
      amount: number
      fee: number | null
      currency: $Enums.Currency
      referenceId: string | null
      description: string | null
      metadata: Prisma.JsonValue | null
      completedAt: Date | null
      cancelledAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly walletId: FieldRef<"Transaction", 'String'>
    readonly fromWalletId: FieldRef<"Transaction", 'String'>
    readonly toWalletId: FieldRef<"Transaction", 'String'>
    readonly referenceCode: FieldRef<"Transaction", 'String'>
    readonly failureReason: FieldRef<"Transaction", 'String'>
    readonly recipientName: FieldRef<"Transaction", 'String'>
    readonly senderName: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly status: FieldRef<"Transaction", 'TransactionStatus'>
    readonly amount: FieldRef<"Transaction", 'Int'>
    readonly fee: FieldRef<"Transaction", 'Int'>
    readonly currency: FieldRef<"Transaction", 'Currency'>
    readonly referenceId: FieldRef<"Transaction", 'String'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly metadata: FieldRef<"Transaction", 'Json'>
    readonly completedAt: FieldRef<"Transaction", 'DateTime'>
    readonly cancelledAt: FieldRef<"Transaction", 'DateTime'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Transfer
   */

  export type AggregateTransfer = {
    _count: TransferCountAggregateOutputType | null
    _avg: TransferAvgAggregateOutputType | null
    _sum: TransferSumAggregateOutputType | null
    _min: TransferMinAggregateOutputType | null
    _max: TransferMaxAggregateOutputType | null
  }

  export type TransferAvgAggregateOutputType = {
    amount: number | null
    fee: number | null
  }

  export type TransferSumAggregateOutputType = {
    amount: number | null
    fee: number | null
  }

  export type TransferMinAggregateOutputType = {
    id: string | null
    fromUserId: string | null
    toUserId: string | null
    fromWalletId: string | null
    toWalletId: string | null
    amount: number | null
    fee: number | null
    status: $Enums.TransactionStatus | null
    reference: string | null
    transactionId: string | null
    counterpartTransactionId: string | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransferMaxAggregateOutputType = {
    id: string | null
    fromUserId: string | null
    toUserId: string | null
    fromWalletId: string | null
    toWalletId: string | null
    amount: number | null
    fee: number | null
    status: $Enums.TransactionStatus | null
    reference: string | null
    transactionId: string | null
    counterpartTransactionId: string | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransferCountAggregateOutputType = {
    id: number
    fromUserId: number
    toUserId: number
    fromWalletId: number
    toWalletId: number
    amount: number
    fee: number
    status: number
    reference: number
    transactionId: number
    counterpartTransactionId: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransferAvgAggregateInputType = {
    amount?: true
    fee?: true
  }

  export type TransferSumAggregateInputType = {
    amount?: true
    fee?: true
  }

  export type TransferMinAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    fromWalletId?: true
    toWalletId?: true
    amount?: true
    fee?: true
    status?: true
    reference?: true
    transactionId?: true
    counterpartTransactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransferMaxAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    fromWalletId?: true
    toWalletId?: true
    amount?: true
    fee?: true
    status?: true
    reference?: true
    transactionId?: true
    counterpartTransactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransferCountAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    fromWalletId?: true
    toWalletId?: true
    amount?: true
    fee?: true
    status?: true
    reference?: true
    transactionId?: true
    counterpartTransactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transfer to aggregate.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transfers
    **/
    _count?: true | TransferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransferMaxAggregateInputType
  }

  export type GetTransferAggregateType<T extends TransferAggregateArgs> = {
        [P in keyof T & keyof AggregateTransfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransfer[P]>
      : GetScalarType<T[P], AggregateTransfer[P]>
  }




  export type TransferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithAggregationInput | TransferOrderByWithAggregationInput[]
    by: TransferScalarFieldEnum[] | TransferScalarFieldEnum
    having?: TransferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransferCountAggregateInputType | true
    _avg?: TransferAvgAggregateInputType
    _sum?: TransferSumAggregateInputType
    _min?: TransferMinAggregateInputType
    _max?: TransferMaxAggregateInputType
  }

  export type TransferGroupByOutputType = {
    id: string
    fromUserId: string
    toUserId: string
    fromWalletId: string
    toWalletId: string
    amount: number
    fee: number | null
    status: $Enums.TransactionStatus
    reference: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TransferCountAggregateOutputType | null
    _avg: TransferAvgAggregateOutputType | null
    _sum: TransferSumAggregateOutputType | null
    _min: TransferMinAggregateOutputType | null
    _max: TransferMaxAggregateOutputType | null
  }

  type GetTransferGroupByPayload<T extends TransferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransferGroupByOutputType[P]>
            : GetScalarType<T[P], TransferGroupByOutputType[P]>
        }
      >
    >


  export type TransferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    fromWalletId?: boolean
    toWalletId?: boolean
    amount?: boolean
    fee?: boolean
    status?: boolean
    reference?: boolean
    transactionId?: boolean
    counterpartTransactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    fromWallet?: boolean | WalletDefaultArgs<ExtArgs>
    toWallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transfer"]>

  export type TransferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    fromWalletId?: boolean
    toWalletId?: boolean
    amount?: boolean
    fee?: boolean
    status?: boolean
    reference?: boolean
    transactionId?: boolean
    counterpartTransactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    fromWallet?: boolean | WalletDefaultArgs<ExtArgs>
    toWallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transfer"]>

  export type TransferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    fromWalletId?: boolean
    toWalletId?: boolean
    amount?: boolean
    fee?: boolean
    status?: boolean
    reference?: boolean
    transactionId?: boolean
    counterpartTransactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    fromWallet?: boolean | WalletDefaultArgs<ExtArgs>
    toWallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transfer"]>

  export type TransferSelectScalar = {
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    fromWalletId?: boolean
    toWalletId?: boolean
    amount?: boolean
    fee?: boolean
    status?: boolean
    reference?: boolean
    transactionId?: boolean
    counterpartTransactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromUserId" | "toUserId" | "fromWalletId" | "toWalletId" | "amount" | "fee" | "status" | "reference" | "transactionId" | "counterpartTransactionId" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["transfer"]>
  export type TransferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    fromWallet?: boolean | WalletDefaultArgs<ExtArgs>
    toWallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TransferIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    fromWallet?: boolean | WalletDefaultArgs<ExtArgs>
    toWallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TransferIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    fromWallet?: boolean | WalletDefaultArgs<ExtArgs>
    toWallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $TransferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transfer"
    objects: {
      fromUser: Prisma.$UserPayload<ExtArgs>
      toUser: Prisma.$UserPayload<ExtArgs>
      fromWallet: Prisma.$WalletPayload<ExtArgs>
      toWallet: Prisma.$WalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromUserId: string
      toUserId: string
      fromWalletId: string
      toWalletId: string
      amount: number
      fee: number | null
      status: $Enums.TransactionStatus
      reference: string | null
      transactionId: string
      counterpartTransactionId: string
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transfer"]>
    composites: {}
  }

  type TransferGetPayload<S extends boolean | null | undefined | TransferDefaultArgs> = $Result.GetResult<Prisma.$TransferPayload, S>

  type TransferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransferCountAggregateInputType | true
    }

  export interface TransferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transfer'], meta: { name: 'Transfer' } }
    /**
     * Find zero or one Transfer that matches the filter.
     * @param {TransferFindUniqueArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransferFindUniqueArgs>(args: SelectSubset<T, TransferFindUniqueArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transfer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransferFindUniqueOrThrowArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransferFindUniqueOrThrowArgs>(args: SelectSubset<T, TransferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindFirstArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransferFindFirstArgs>(args?: SelectSubset<T, TransferFindFirstArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transfer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindFirstOrThrowArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransferFindFirstOrThrowArgs>(args?: SelectSubset<T, TransferFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transfers
     * const transfers = await prisma.transfer.findMany()
     * 
     * // Get first 10 Transfers
     * const transfers = await prisma.transfer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transferWithIdOnly = await prisma.transfer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransferFindManyArgs>(args?: SelectSubset<T, TransferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transfer.
     * @param {TransferCreateArgs} args - Arguments to create a Transfer.
     * @example
     * // Create one Transfer
     * const Transfer = await prisma.transfer.create({
     *   data: {
     *     // ... data to create a Transfer
     *   }
     * })
     * 
     */
    create<T extends TransferCreateArgs>(args: SelectSubset<T, TransferCreateArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transfers.
     * @param {TransferCreateManyArgs} args - Arguments to create many Transfers.
     * @example
     * // Create many Transfers
     * const transfer = await prisma.transfer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransferCreateManyArgs>(args?: SelectSubset<T, TransferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transfers and returns the data saved in the database.
     * @param {TransferCreateManyAndReturnArgs} args - Arguments to create many Transfers.
     * @example
     * // Create many Transfers
     * const transfer = await prisma.transfer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transfers and only return the `id`
     * const transferWithIdOnly = await prisma.transfer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransferCreateManyAndReturnArgs>(args?: SelectSubset<T, TransferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transfer.
     * @param {TransferDeleteArgs} args - Arguments to delete one Transfer.
     * @example
     * // Delete one Transfer
     * const Transfer = await prisma.transfer.delete({
     *   where: {
     *     // ... filter to delete one Transfer
     *   }
     * })
     * 
     */
    delete<T extends TransferDeleteArgs>(args: SelectSubset<T, TransferDeleteArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transfer.
     * @param {TransferUpdateArgs} args - Arguments to update one Transfer.
     * @example
     * // Update one Transfer
     * const transfer = await prisma.transfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransferUpdateArgs>(args: SelectSubset<T, TransferUpdateArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transfers.
     * @param {TransferDeleteManyArgs} args - Arguments to filter Transfers to delete.
     * @example
     * // Delete a few Transfers
     * const { count } = await prisma.transfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransferDeleteManyArgs>(args?: SelectSubset<T, TransferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transfers
     * const transfer = await prisma.transfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransferUpdateManyArgs>(args: SelectSubset<T, TransferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transfers and returns the data updated in the database.
     * @param {TransferUpdateManyAndReturnArgs} args - Arguments to update many Transfers.
     * @example
     * // Update many Transfers
     * const transfer = await prisma.transfer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transfers and only return the `id`
     * const transferWithIdOnly = await prisma.transfer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransferUpdateManyAndReturnArgs>(args: SelectSubset<T, TransferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transfer.
     * @param {TransferUpsertArgs} args - Arguments to update or create a Transfer.
     * @example
     * // Update or create a Transfer
     * const transfer = await prisma.transfer.upsert({
     *   create: {
     *     // ... data to create a Transfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transfer we want to update
     *   }
     * })
     */
    upsert<T extends TransferUpsertArgs>(args: SelectSubset<T, TransferUpsertArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferCountArgs} args - Arguments to filter Transfers to count.
     * @example
     * // Count the number of Transfers
     * const count = await prisma.transfer.count({
     *   where: {
     *     // ... the filter for the Transfers we want to count
     *   }
     * })
    **/
    count<T extends TransferCountArgs>(
      args?: Subset<T, TransferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransferAggregateArgs>(args: Subset<T, TransferAggregateArgs>): Prisma.PrismaPromise<GetTransferAggregateType<T>>

    /**
     * Group by Transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransferGroupByArgs['orderBy'] }
        : { orderBy?: TransferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transfer model
   */
  readonly fields: TransferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fromWallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toWallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transfer model
   */
  interface TransferFieldRefs {
    readonly id: FieldRef<"Transfer", 'String'>
    readonly fromUserId: FieldRef<"Transfer", 'String'>
    readonly toUserId: FieldRef<"Transfer", 'String'>
    readonly fromWalletId: FieldRef<"Transfer", 'String'>
    readonly toWalletId: FieldRef<"Transfer", 'String'>
    readonly amount: FieldRef<"Transfer", 'Int'>
    readonly fee: FieldRef<"Transfer", 'Int'>
    readonly status: FieldRef<"Transfer", 'TransactionStatus'>
    readonly reference: FieldRef<"Transfer", 'String'>
    readonly transactionId: FieldRef<"Transfer", 'String'>
    readonly counterpartTransactionId: FieldRef<"Transfer", 'String'>
    readonly completedAt: FieldRef<"Transfer", 'DateTime'>
    readonly createdAt: FieldRef<"Transfer", 'DateTime'>
    readonly updatedAt: FieldRef<"Transfer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transfer findUnique
   */
  export type TransferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer findUniqueOrThrow
   */
  export type TransferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer findFirst
   */
  export type TransferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transfers.
     */
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer findFirstOrThrow
   */
  export type TransferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transfers.
     */
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer findMany
   */
  export type TransferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfers to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transfers.
     */
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer create
   */
  export type TransferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * The data needed to create a Transfer.
     */
    data: XOR<TransferCreateInput, TransferUncheckedCreateInput>
  }

  /**
   * Transfer createMany
   */
  export type TransferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transfers.
     */
    data: TransferCreateManyInput | TransferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transfer createManyAndReturn
   */
  export type TransferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * The data used to create many Transfers.
     */
    data: TransferCreateManyInput | TransferCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transfer update
   */
  export type TransferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * The data needed to update a Transfer.
     */
    data: XOR<TransferUpdateInput, TransferUncheckedUpdateInput>
    /**
     * Choose, which Transfer to update.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer updateMany
   */
  export type TransferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transfers.
     */
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyInput>
    /**
     * Filter which Transfers to update
     */
    where?: TransferWhereInput
    /**
     * Limit how many Transfers to update.
     */
    limit?: number
  }

  /**
   * Transfer updateManyAndReturn
   */
  export type TransferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * The data used to update Transfers.
     */
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyInput>
    /**
     * Filter which Transfers to update
     */
    where?: TransferWhereInput
    /**
     * Limit how many Transfers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transfer upsert
   */
  export type TransferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * The filter to search for the Transfer to update in case it exists.
     */
    where: TransferWhereUniqueInput
    /**
     * In case the Transfer found by the `where` argument doesn't exist, create a new Transfer with this data.
     */
    create: XOR<TransferCreateInput, TransferUncheckedCreateInput>
    /**
     * In case the Transfer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransferUpdateInput, TransferUncheckedUpdateInput>
  }

  /**
   * Transfer delete
   */
  export type TransferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter which Transfer to delete.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer deleteMany
   */
  export type TransferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transfers to delete
     */
    where?: TransferWhereInput
    /**
     * Limit how many Transfers to delete.
     */
    limit?: number
  }

  /**
   * Transfer without action
   */
  export type TransferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
  }


  /**
   * Model TopUp
   */

  export type AggregateTopUp = {
    _count: TopUpCountAggregateOutputType | null
    _avg: TopUpAvgAggregateOutputType | null
    _sum: TopUpSumAggregateOutputType | null
    _min: TopUpMinAggregateOutputType | null
    _max: TopUpMaxAggregateOutputType | null
  }

  export type TopUpAvgAggregateOutputType = {
    amount: number | null
  }

  export type TopUpSumAggregateOutputType = {
    amount: number | null
  }

  export type TopUpMinAggregateOutputType = {
    id: string | null
    userId: string | null
    walletId: string | null
    amount: number | null
    method: $Enums.TopUpMethod | null
    status: $Enums.TransactionStatus | null
    externalReference: string | null
    transactionId: string | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TopUpMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    walletId: string | null
    amount: number | null
    method: $Enums.TopUpMethod | null
    status: $Enums.TransactionStatus | null
    externalReference: string | null
    transactionId: string | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TopUpCountAggregateOutputType = {
    id: number
    userId: number
    walletId: number
    amount: number
    method: number
    status: number
    externalReference: number
    transactionId: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TopUpAvgAggregateInputType = {
    amount?: true
  }

  export type TopUpSumAggregateInputType = {
    amount?: true
  }

  export type TopUpMinAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    amount?: true
    method?: true
    status?: true
    externalReference?: true
    transactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TopUpMaxAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    amount?: true
    method?: true
    status?: true
    externalReference?: true
    transactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TopUpCountAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    amount?: true
    method?: true
    status?: true
    externalReference?: true
    transactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TopUpAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TopUp to aggregate.
     */
    where?: TopUpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TopUps to fetch.
     */
    orderBy?: TopUpOrderByWithRelationInput | TopUpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TopUpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TopUps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TopUps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TopUps
    **/
    _count?: true | TopUpCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TopUpAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TopUpSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TopUpMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TopUpMaxAggregateInputType
  }

  export type GetTopUpAggregateType<T extends TopUpAggregateArgs> = {
        [P in keyof T & keyof AggregateTopUp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTopUp[P]>
      : GetScalarType<T[P], AggregateTopUp[P]>
  }




  export type TopUpGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TopUpWhereInput
    orderBy?: TopUpOrderByWithAggregationInput | TopUpOrderByWithAggregationInput[]
    by: TopUpScalarFieldEnum[] | TopUpScalarFieldEnum
    having?: TopUpScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TopUpCountAggregateInputType | true
    _avg?: TopUpAvgAggregateInputType
    _sum?: TopUpSumAggregateInputType
    _min?: TopUpMinAggregateInputType
    _max?: TopUpMaxAggregateInputType
  }

  export type TopUpGroupByOutputType = {
    id: string
    userId: string
    walletId: string
    amount: number
    method: $Enums.TopUpMethod
    status: $Enums.TransactionStatus
    externalReference: string | null
    transactionId: string
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TopUpCountAggregateOutputType | null
    _avg: TopUpAvgAggregateOutputType | null
    _sum: TopUpSumAggregateOutputType | null
    _min: TopUpMinAggregateOutputType | null
    _max: TopUpMaxAggregateOutputType | null
  }

  type GetTopUpGroupByPayload<T extends TopUpGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TopUpGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TopUpGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TopUpGroupByOutputType[P]>
            : GetScalarType<T[P], TopUpGroupByOutputType[P]>
        }
      >
    >


  export type TopUpSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    amount?: boolean
    method?: boolean
    status?: boolean
    externalReference?: boolean
    transactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topUp"]>

  export type TopUpSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    amount?: boolean
    method?: boolean
    status?: boolean
    externalReference?: boolean
    transactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topUp"]>

  export type TopUpSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    amount?: boolean
    method?: boolean
    status?: boolean
    externalReference?: boolean
    transactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topUp"]>

  export type TopUpSelectScalar = {
    id?: boolean
    userId?: boolean
    walletId?: boolean
    amount?: boolean
    method?: boolean
    status?: boolean
    externalReference?: boolean
    transactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TopUpOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "walletId" | "amount" | "method" | "status" | "externalReference" | "transactionId" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["topUp"]>
  export type TopUpInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TopUpIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TopUpIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $TopUpPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TopUp"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      wallet: Prisma.$WalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      walletId: string
      amount: number
      method: $Enums.TopUpMethod
      status: $Enums.TransactionStatus
      externalReference: string | null
      transactionId: string
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["topUp"]>
    composites: {}
  }

  type TopUpGetPayload<S extends boolean | null | undefined | TopUpDefaultArgs> = $Result.GetResult<Prisma.$TopUpPayload, S>

  type TopUpCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TopUpFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TopUpCountAggregateInputType | true
    }

  export interface TopUpDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TopUp'], meta: { name: 'TopUp' } }
    /**
     * Find zero or one TopUp that matches the filter.
     * @param {TopUpFindUniqueArgs} args - Arguments to find a TopUp
     * @example
     * // Get one TopUp
     * const topUp = await prisma.topUp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TopUpFindUniqueArgs>(args: SelectSubset<T, TopUpFindUniqueArgs<ExtArgs>>): Prisma__TopUpClient<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TopUp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TopUpFindUniqueOrThrowArgs} args - Arguments to find a TopUp
     * @example
     * // Get one TopUp
     * const topUp = await prisma.topUp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TopUpFindUniqueOrThrowArgs>(args: SelectSubset<T, TopUpFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TopUpClient<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TopUp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopUpFindFirstArgs} args - Arguments to find a TopUp
     * @example
     * // Get one TopUp
     * const topUp = await prisma.topUp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TopUpFindFirstArgs>(args?: SelectSubset<T, TopUpFindFirstArgs<ExtArgs>>): Prisma__TopUpClient<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TopUp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopUpFindFirstOrThrowArgs} args - Arguments to find a TopUp
     * @example
     * // Get one TopUp
     * const topUp = await prisma.topUp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TopUpFindFirstOrThrowArgs>(args?: SelectSubset<T, TopUpFindFirstOrThrowArgs<ExtArgs>>): Prisma__TopUpClient<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TopUps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopUpFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TopUps
     * const topUps = await prisma.topUp.findMany()
     * 
     * // Get first 10 TopUps
     * const topUps = await prisma.topUp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const topUpWithIdOnly = await prisma.topUp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TopUpFindManyArgs>(args?: SelectSubset<T, TopUpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TopUp.
     * @param {TopUpCreateArgs} args - Arguments to create a TopUp.
     * @example
     * // Create one TopUp
     * const TopUp = await prisma.topUp.create({
     *   data: {
     *     // ... data to create a TopUp
     *   }
     * })
     * 
     */
    create<T extends TopUpCreateArgs>(args: SelectSubset<T, TopUpCreateArgs<ExtArgs>>): Prisma__TopUpClient<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TopUps.
     * @param {TopUpCreateManyArgs} args - Arguments to create many TopUps.
     * @example
     * // Create many TopUps
     * const topUp = await prisma.topUp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TopUpCreateManyArgs>(args?: SelectSubset<T, TopUpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TopUps and returns the data saved in the database.
     * @param {TopUpCreateManyAndReturnArgs} args - Arguments to create many TopUps.
     * @example
     * // Create many TopUps
     * const topUp = await prisma.topUp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TopUps and only return the `id`
     * const topUpWithIdOnly = await prisma.topUp.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TopUpCreateManyAndReturnArgs>(args?: SelectSubset<T, TopUpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TopUp.
     * @param {TopUpDeleteArgs} args - Arguments to delete one TopUp.
     * @example
     * // Delete one TopUp
     * const TopUp = await prisma.topUp.delete({
     *   where: {
     *     // ... filter to delete one TopUp
     *   }
     * })
     * 
     */
    delete<T extends TopUpDeleteArgs>(args: SelectSubset<T, TopUpDeleteArgs<ExtArgs>>): Prisma__TopUpClient<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TopUp.
     * @param {TopUpUpdateArgs} args - Arguments to update one TopUp.
     * @example
     * // Update one TopUp
     * const topUp = await prisma.topUp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TopUpUpdateArgs>(args: SelectSubset<T, TopUpUpdateArgs<ExtArgs>>): Prisma__TopUpClient<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TopUps.
     * @param {TopUpDeleteManyArgs} args - Arguments to filter TopUps to delete.
     * @example
     * // Delete a few TopUps
     * const { count } = await prisma.topUp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TopUpDeleteManyArgs>(args?: SelectSubset<T, TopUpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TopUps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopUpUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TopUps
     * const topUp = await prisma.topUp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TopUpUpdateManyArgs>(args: SelectSubset<T, TopUpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TopUps and returns the data updated in the database.
     * @param {TopUpUpdateManyAndReturnArgs} args - Arguments to update many TopUps.
     * @example
     * // Update many TopUps
     * const topUp = await prisma.topUp.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TopUps and only return the `id`
     * const topUpWithIdOnly = await prisma.topUp.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TopUpUpdateManyAndReturnArgs>(args: SelectSubset<T, TopUpUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TopUp.
     * @param {TopUpUpsertArgs} args - Arguments to update or create a TopUp.
     * @example
     * // Update or create a TopUp
     * const topUp = await prisma.topUp.upsert({
     *   create: {
     *     // ... data to create a TopUp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TopUp we want to update
     *   }
     * })
     */
    upsert<T extends TopUpUpsertArgs>(args: SelectSubset<T, TopUpUpsertArgs<ExtArgs>>): Prisma__TopUpClient<$Result.GetResult<Prisma.$TopUpPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TopUps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopUpCountArgs} args - Arguments to filter TopUps to count.
     * @example
     * // Count the number of TopUps
     * const count = await prisma.topUp.count({
     *   where: {
     *     // ... the filter for the TopUps we want to count
     *   }
     * })
    **/
    count<T extends TopUpCountArgs>(
      args?: Subset<T, TopUpCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TopUpCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TopUp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopUpAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TopUpAggregateArgs>(args: Subset<T, TopUpAggregateArgs>): Prisma.PrismaPromise<GetTopUpAggregateType<T>>

    /**
     * Group by TopUp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopUpGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TopUpGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TopUpGroupByArgs['orderBy'] }
        : { orderBy?: TopUpGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TopUpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTopUpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TopUp model
   */
  readonly fields: TopUpFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TopUp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TopUpClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TopUp model
   */
  interface TopUpFieldRefs {
    readonly id: FieldRef<"TopUp", 'String'>
    readonly userId: FieldRef<"TopUp", 'String'>
    readonly walletId: FieldRef<"TopUp", 'String'>
    readonly amount: FieldRef<"TopUp", 'Int'>
    readonly method: FieldRef<"TopUp", 'TopUpMethod'>
    readonly status: FieldRef<"TopUp", 'TransactionStatus'>
    readonly externalReference: FieldRef<"TopUp", 'String'>
    readonly transactionId: FieldRef<"TopUp", 'String'>
    readonly completedAt: FieldRef<"TopUp", 'DateTime'>
    readonly createdAt: FieldRef<"TopUp", 'DateTime'>
    readonly updatedAt: FieldRef<"TopUp", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TopUp findUnique
   */
  export type TopUpFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * Filter, which TopUp to fetch.
     */
    where: TopUpWhereUniqueInput
  }

  /**
   * TopUp findUniqueOrThrow
   */
  export type TopUpFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * Filter, which TopUp to fetch.
     */
    where: TopUpWhereUniqueInput
  }

  /**
   * TopUp findFirst
   */
  export type TopUpFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * Filter, which TopUp to fetch.
     */
    where?: TopUpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TopUps to fetch.
     */
    orderBy?: TopUpOrderByWithRelationInput | TopUpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TopUps.
     */
    cursor?: TopUpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TopUps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TopUps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TopUps.
     */
    distinct?: TopUpScalarFieldEnum | TopUpScalarFieldEnum[]
  }

  /**
   * TopUp findFirstOrThrow
   */
  export type TopUpFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * Filter, which TopUp to fetch.
     */
    where?: TopUpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TopUps to fetch.
     */
    orderBy?: TopUpOrderByWithRelationInput | TopUpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TopUps.
     */
    cursor?: TopUpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TopUps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TopUps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TopUps.
     */
    distinct?: TopUpScalarFieldEnum | TopUpScalarFieldEnum[]
  }

  /**
   * TopUp findMany
   */
  export type TopUpFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * Filter, which TopUps to fetch.
     */
    where?: TopUpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TopUps to fetch.
     */
    orderBy?: TopUpOrderByWithRelationInput | TopUpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TopUps.
     */
    cursor?: TopUpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TopUps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TopUps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TopUps.
     */
    distinct?: TopUpScalarFieldEnum | TopUpScalarFieldEnum[]
  }

  /**
   * TopUp create
   */
  export type TopUpCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * The data needed to create a TopUp.
     */
    data: XOR<TopUpCreateInput, TopUpUncheckedCreateInput>
  }

  /**
   * TopUp createMany
   */
  export type TopUpCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TopUps.
     */
    data: TopUpCreateManyInput | TopUpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TopUp createManyAndReturn
   */
  export type TopUpCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * The data used to create many TopUps.
     */
    data: TopUpCreateManyInput | TopUpCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TopUp update
   */
  export type TopUpUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * The data needed to update a TopUp.
     */
    data: XOR<TopUpUpdateInput, TopUpUncheckedUpdateInput>
    /**
     * Choose, which TopUp to update.
     */
    where: TopUpWhereUniqueInput
  }

  /**
   * TopUp updateMany
   */
  export type TopUpUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TopUps.
     */
    data: XOR<TopUpUpdateManyMutationInput, TopUpUncheckedUpdateManyInput>
    /**
     * Filter which TopUps to update
     */
    where?: TopUpWhereInput
    /**
     * Limit how many TopUps to update.
     */
    limit?: number
  }

  /**
   * TopUp updateManyAndReturn
   */
  export type TopUpUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * The data used to update TopUps.
     */
    data: XOR<TopUpUpdateManyMutationInput, TopUpUncheckedUpdateManyInput>
    /**
     * Filter which TopUps to update
     */
    where?: TopUpWhereInput
    /**
     * Limit how many TopUps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TopUp upsert
   */
  export type TopUpUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * The filter to search for the TopUp to update in case it exists.
     */
    where: TopUpWhereUniqueInput
    /**
     * In case the TopUp found by the `where` argument doesn't exist, create a new TopUp with this data.
     */
    create: XOR<TopUpCreateInput, TopUpUncheckedCreateInput>
    /**
     * In case the TopUp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TopUpUpdateInput, TopUpUncheckedUpdateInput>
  }

  /**
   * TopUp delete
   */
  export type TopUpDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
    /**
     * Filter which TopUp to delete.
     */
    where: TopUpWhereUniqueInput
  }

  /**
   * TopUp deleteMany
   */
  export type TopUpDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TopUps to delete
     */
    where?: TopUpWhereInput
    /**
     * Limit how many TopUps to delete.
     */
    limit?: number
  }

  /**
   * TopUp without action
   */
  export type TopUpDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopUp
     */
    select?: TopUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TopUp
     */
    omit?: TopUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopUpInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
    fee: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
    fee: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    walletId: string | null
    amount: number | null
    fee: number | null
    type: $Enums.PaymentType | null
    merchantId: string | null
    billCode: string | null
    description: string | null
    status: $Enums.TransactionStatus | null
    transactionId: string | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    walletId: string | null
    amount: number | null
    fee: number | null
    type: $Enums.PaymentType | null
    merchantId: string | null
    billCode: string | null
    description: string | null
    status: $Enums.TransactionStatus | null
    transactionId: string | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    userId: number
    walletId: number
    amount: number
    fee: number
    type: number
    merchantId: number
    billCode: number
    description: number
    status: number
    transactionId: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
    fee?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
    fee?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    amount?: true
    fee?: true
    type?: true
    merchantId?: true
    billCode?: true
    description?: true
    status?: true
    transactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    amount?: true
    fee?: true
    type?: true
    merchantId?: true
    billCode?: true
    description?: true
    status?: true
    transactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    userId?: true
    walletId?: true
    amount?: true
    fee?: true
    type?: true
    merchantId?: true
    billCode?: true
    description?: true
    status?: true
    transactionId?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    userId: string
    walletId: string
    amount: number
    fee: number | null
    type: $Enums.PaymentType
    merchantId: string | null
    billCode: string | null
    description: string | null
    status: $Enums.TransactionStatus
    transactionId: string
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    amount?: boolean
    fee?: boolean
    type?: boolean
    merchantId?: boolean
    billCode?: boolean
    description?: boolean
    status?: boolean
    transactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    amount?: boolean
    fee?: boolean
    type?: boolean
    merchantId?: boolean
    billCode?: boolean
    description?: boolean
    status?: boolean
    transactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletId?: boolean
    amount?: boolean
    fee?: boolean
    type?: boolean
    merchantId?: boolean
    billCode?: boolean
    description?: boolean
    status?: boolean
    transactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    userId?: boolean
    walletId?: boolean
    amount?: boolean
    fee?: boolean
    type?: boolean
    merchantId?: boolean
    billCode?: boolean
    description?: boolean
    status?: boolean
    transactionId?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "walletId" | "amount" | "fee" | "type" | "merchantId" | "billCode" | "description" | "status" | "transactionId" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      wallet: Prisma.$WalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      walletId: string
      amount: number
      fee: number | null
      type: $Enums.PaymentType
      merchantId: string | null
      billCode: string | null
      description: string | null
      status: $Enums.TransactionStatus
      transactionId: string
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly userId: FieldRef<"Payment", 'String'>
    readonly walletId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Int'>
    readonly fee: FieldRef<"Payment", 'Int'>
    readonly type: FieldRef<"Payment", 'PaymentType'>
    readonly merchantId: FieldRef<"Payment", 'String'>
    readonly billCode: FieldRef<"Payment", 'String'>
    readonly description: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'TransactionStatus'>
    readonly transactionId: FieldRef<"Payment", 'String'>
    readonly completedAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: $Enums.NotificationType | null
    isRead: boolean | null
    readAt: Date | null
    link: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: $Enums.NotificationType | null
    isRead: boolean | null
    readAt: Date | null
    link: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    type: number
    isRead: number
    readAt: number
    link: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    readAt?: true
    link?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    readAt?: true
    link?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    readAt?: true
    link?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead: boolean
    readAt: Date | null
    link: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    readAt?: boolean
    link?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    readAt?: boolean
    link?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    readAt?: boolean
    link?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    readAt?: boolean
    link?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "message" | "type" | "isRead" | "readAt" | "link" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      type: $Enums.NotificationType
      isRead: boolean
      readAt: Date | null
      link: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly readAt: FieldRef<"Notification", 'DateTime'>
    readonly link: FieldRef<"Notification", 'String'>
    readonly metadata: FieldRef<"Notification", 'Json'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    userId: string | null
    role: $Enums.AdminRole | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    role: $Enums.AdminRole | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    userId: number
    role: number
    permissions: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    userId?: true
    role?: true
    permissions?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    userId: string
    role: $Enums.AdminRole
    permissions: string[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    role?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    userId?: boolean
    role?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "role" | "permissions" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      role: $Enums.AdminRole
      permissions: string[]
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly userId: FieldRef<"Admin", 'String'>
    readonly role: FieldRef<"Admin", 'AdminRole'>
    readonly permissions: FieldRef<"Admin", 'String[]'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
    readonly deletedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model UserSession
   */

  export type AggregateUserSession = {
    _count: UserSessionCountAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  export type UserSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    deviceInfo: string | null
    ipAddress: string | null
    expiresAt: Date | null
    isRevoked: boolean | null
    revokedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    deviceInfo: string | null
    ipAddress: string | null
    expiresAt: Date | null
    isRevoked: boolean | null
    revokedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    deviceInfo: number
    ipAddress: number
    expiresAt: number
    isRevoked: number
    revokedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserSessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    deviceInfo?: true
    ipAddress?: true
    expiresAt?: true
    isRevoked?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    deviceInfo?: true
    ipAddress?: true
    expiresAt?: true
    isRevoked?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    deviceInfo?: true
    ipAddress?: true
    expiresAt?: true
    isRevoked?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSession to aggregate.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSessions
    **/
    _count?: true | UserSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSessionMaxAggregateInputType
  }

  export type GetUserSessionAggregateType<T extends UserSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSession[P]>
      : GetScalarType<T[P], AggregateUserSession[P]>
  }




  export type UserSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithAggregationInput | UserSessionOrderByWithAggregationInput[]
    by: UserSessionScalarFieldEnum[] | UserSessionScalarFieldEnum
    having?: UserSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSessionCountAggregateInputType | true
    _min?: UserSessionMinAggregateInputType
    _max?: UserSessionMaxAggregateInputType
  }

  export type UserSessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    deviceInfo: string | null
    ipAddress: string | null
    expiresAt: Date
    isRevoked: boolean
    revokedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserSessionCountAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  type GetUserSessionGroupByPayload<T extends UserSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
        }
      >
    >


  export type UserSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "deviceInfo" | "ipAddress" | "expiresAt" | "isRevoked" | "revokedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userSession"]>
  export type UserSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      deviceInfo: string | null
      ipAddress: string | null
      expiresAt: Date
      isRevoked: boolean
      revokedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userSession"]>
    composites: {}
  }

  type UserSessionGetPayload<S extends boolean | null | undefined | UserSessionDefaultArgs> = $Result.GetResult<Prisma.$UserSessionPayload, S>

  type UserSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSessionCountAggregateInputType | true
    }

  export interface UserSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSession'], meta: { name: 'UserSession' } }
    /**
     * Find zero or one UserSession that matches the filter.
     * @param {UserSessionFindUniqueArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSessionFindUniqueArgs>(args: SelectSubset<T, UserSessionFindUniqueArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSessionFindUniqueOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSessionFindFirstArgs>(args?: SelectSubset<T, UserSessionFindFirstArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSessions
     * const userSessions = await prisma.userSession.findMany()
     * 
     * // Get first 10 UserSessions
     * const userSessions = await prisma.userSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSessionWithIdOnly = await prisma.userSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSessionFindManyArgs>(args?: SelectSubset<T, UserSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSession.
     * @param {UserSessionCreateArgs} args - Arguments to create a UserSession.
     * @example
     * // Create one UserSession
     * const UserSession = await prisma.userSession.create({
     *   data: {
     *     // ... data to create a UserSession
     *   }
     * })
     * 
     */
    create<T extends UserSessionCreateArgs>(args: SelectSubset<T, UserSessionCreateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSessions.
     * @param {UserSessionCreateManyArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSessionCreateManyArgs>(args?: SelectSubset<T, UserSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSessions and returns the data saved in the database.
     * @param {UserSessionCreateManyAndReturnArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSession.
     * @param {UserSessionDeleteArgs} args - Arguments to delete one UserSession.
     * @example
     * // Delete one UserSession
     * const UserSession = await prisma.userSession.delete({
     *   where: {
     *     // ... filter to delete one UserSession
     *   }
     * })
     * 
     */
    delete<T extends UserSessionDeleteArgs>(args: SelectSubset<T, UserSessionDeleteArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSession.
     * @param {UserSessionUpdateArgs} args - Arguments to update one UserSession.
     * @example
     * // Update one UserSession
     * const userSession = await prisma.userSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSessionUpdateArgs>(args: SelectSubset<T, UserSessionUpdateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSessions.
     * @param {UserSessionDeleteManyArgs} args - Arguments to filter UserSessions to delete.
     * @example
     * // Delete a few UserSessions
     * const { count } = await prisma.userSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSessionDeleteManyArgs>(args?: SelectSubset<T, UserSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSessionUpdateManyArgs>(args: SelectSubset<T, UserSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions and returns the data updated in the database.
     * @param {UserSessionUpdateManyAndReturnArgs} args - Arguments to update many UserSessions.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSession.
     * @param {UserSessionUpsertArgs} args - Arguments to update or create a UserSession.
     * @example
     * // Update or create a UserSession
     * const userSession = await prisma.userSession.upsert({
     *   create: {
     *     // ... data to create a UserSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSession we want to update
     *   }
     * })
     */
    upsert<T extends UserSessionUpsertArgs>(args: SelectSubset<T, UserSessionUpsertArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionCountArgs} args - Arguments to filter UserSessions to count.
     * @example
     * // Count the number of UserSessions
     * const count = await prisma.userSession.count({
     *   where: {
     *     // ... the filter for the UserSessions we want to count
     *   }
     * })
    **/
    count<T extends UserSessionCountArgs>(
      args?: Subset<T, UserSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSessionAggregateArgs>(args: Subset<T, UserSessionAggregateArgs>): Prisma.PrismaPromise<GetUserSessionAggregateType<T>>

    /**
     * Group by UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSessionGroupByArgs['orderBy'] }
        : { orderBy?: UserSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSession model
   */
  readonly fields: UserSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSession model
   */
  interface UserSessionFieldRefs {
    readonly id: FieldRef<"UserSession", 'String'>
    readonly userId: FieldRef<"UserSession", 'String'>
    readonly token: FieldRef<"UserSession", 'String'>
    readonly deviceInfo: FieldRef<"UserSession", 'String'>
    readonly ipAddress: FieldRef<"UserSession", 'String'>
    readonly expiresAt: FieldRef<"UserSession", 'DateTime'>
    readonly isRevoked: FieldRef<"UserSession", 'Boolean'>
    readonly revokedAt: FieldRef<"UserSession", 'DateTime'>
    readonly createdAt: FieldRef<"UserSession", 'DateTime'>
    readonly updatedAt: FieldRef<"UserSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSession findUnique
   */
  export type UserSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findUniqueOrThrow
   */
  export type UserSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findFirst
   */
  export type UserSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findFirstOrThrow
   */
  export type UserSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findMany
   */
  export type UserSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSessions to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession create
   */
  export type UserSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSession.
     */
    data: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
  }

  /**
   * UserSession createMany
   */
  export type UserSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSession createManyAndReturn
   */
  export type UserSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession update
   */
  export type UserSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSession.
     */
    data: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
    /**
     * Choose, which UserSession to update.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession updateMany
   */
  export type UserSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
  }

  /**
   * UserSession updateManyAndReturn
   */
  export type UserSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession upsert
   */
  export type UserSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSession to update in case it exists.
     */
    where: UserSessionWhereUniqueInput
    /**
     * In case the UserSession found by the `where` argument doesn't exist, create a new UserSession with this data.
     */
    create: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
    /**
     * In case the UserSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
  }

  /**
   * UserSession delete
   */
  export type UserSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter which UserSession to delete.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession deleteMany
   */
  export type UserSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSessions to delete
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to delete.
     */
    limit?: number
  }

  /**
   * UserSession without action
   */
  export type UserSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
  }


  /**
   * Model SystemSetting
   */

  export type AggregateSystemSetting = {
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  export type SystemSettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemSettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemSettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    description: number
    isPublic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemSettingMinAggregateInputType = {
    id?: true
    key?: true
    description?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemSettingMaxAggregateInputType = {
    id?: true
    key?: true
    description?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemSettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSetting to aggregate.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemSettings
    **/
    _count?: true | SystemSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemSettingMaxAggregateInputType
  }

  export type GetSystemSettingAggregateType<T extends SystemSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSetting[P]>
      : GetScalarType<T[P], AggregateSystemSetting[P]>
  }




  export type SystemSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemSettingWhereInput
    orderBy?: SystemSettingOrderByWithAggregationInput | SystemSettingOrderByWithAggregationInput[]
    by: SystemSettingScalarFieldEnum[] | SystemSettingScalarFieldEnum
    having?: SystemSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemSettingCountAggregateInputType | true
    _min?: SystemSettingMinAggregateInputType
    _max?: SystemSettingMaxAggregateInputType
  }

  export type SystemSettingGroupByOutputType = {
    id: string
    key: string
    value: JsonValue
    description: string | null
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  type GetSystemSettingGroupByPayload<T extends SystemSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
        }
      >
    >


  export type SystemSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SystemSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "description" | "isPublic" | "createdAt" | "updatedAt", ExtArgs["result"]["systemSetting"]>

  export type $SystemSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: Prisma.JsonValue
      description: string | null
      isPublic: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemSetting"]>
    composites: {}
  }

  type SystemSettingGetPayload<S extends boolean | null | undefined | SystemSettingDefaultArgs> = $Result.GetResult<Prisma.$SystemSettingPayload, S>

  type SystemSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemSettingCountAggregateInputType | true
    }

  export interface SystemSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemSetting'], meta: { name: 'SystemSetting' } }
    /**
     * Find zero or one SystemSetting that matches the filter.
     * @param {SystemSettingFindUniqueArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemSettingFindUniqueArgs>(args: SelectSubset<T, SystemSettingFindUniqueArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemSettingFindUniqueOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemSettingFindFirstArgs>(args?: SelectSubset<T, SystemSettingFindFirstArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany()
     * 
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemSettingFindManyArgs>(args?: SelectSubset<T, SystemSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemSetting.
     * @param {SystemSettingCreateArgs} args - Arguments to create a SystemSetting.
     * @example
     * // Create one SystemSetting
     * const SystemSetting = await prisma.systemSetting.create({
     *   data: {
     *     // ... data to create a SystemSetting
     *   }
     * })
     * 
     */
    create<T extends SystemSettingCreateArgs>(args: SelectSubset<T, SystemSettingCreateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemSettings.
     * @param {SystemSettingCreateManyArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemSettingCreateManyArgs>(args?: SelectSubset<T, SystemSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemSettings and returns the data saved in the database.
     * @param {SystemSettingCreateManyAndReturnArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemSettings and only return the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemSetting.
     * @param {SystemSettingDeleteArgs} args - Arguments to delete one SystemSetting.
     * @example
     * // Delete one SystemSetting
     * const SystemSetting = await prisma.systemSetting.delete({
     *   where: {
     *     // ... filter to delete one SystemSetting
     *   }
     * })
     * 
     */
    delete<T extends SystemSettingDeleteArgs>(args: SelectSubset<T, SystemSettingDeleteArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemSetting.
     * @param {SystemSettingUpdateArgs} args - Arguments to update one SystemSetting.
     * @example
     * // Update one SystemSetting
     * const systemSetting = await prisma.systemSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemSettingUpdateArgs>(args: SelectSubset<T, SystemSettingUpdateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemSettingDeleteManyArgs>(args?: SelectSubset<T, SystemSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemSettingUpdateManyArgs>(args: SelectSubset<T, SystemSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings and returns the data updated in the database.
     * @param {SystemSettingUpdateManyAndReturnArgs} args - Arguments to update many SystemSettings.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemSettings and only return the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemSetting.
     * @param {SystemSettingUpsertArgs} args - Arguments to update or create a SystemSetting.
     * @example
     * // Update or create a SystemSetting
     * const systemSetting = await prisma.systemSetting.upsert({
     *   create: {
     *     // ... data to create a SystemSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSetting we want to update
     *   }
     * })
     */
    upsert<T extends SystemSettingUpsertArgs>(args: SelectSubset<T, SystemSettingUpsertArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSetting.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
    **/
    count<T extends SystemSettingCountArgs>(
      args?: Subset<T, SystemSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemSettingAggregateArgs>(args: Subset<T, SystemSettingAggregateArgs>): Prisma.PrismaPromise<GetSystemSettingAggregateType<T>>

    /**
     * Group by SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemSetting model
   */
  readonly fields: SystemSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemSetting model
   */
  interface SystemSettingFieldRefs {
    readonly id: FieldRef<"SystemSetting", 'String'>
    readonly key: FieldRef<"SystemSetting", 'String'>
    readonly value: FieldRef<"SystemSetting", 'Json'>
    readonly description: FieldRef<"SystemSetting", 'String'>
    readonly isPublic: FieldRef<"SystemSetting", 'Boolean'>
    readonly createdAt: FieldRef<"SystemSetting", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemSetting findUnique
   */
  export type SystemSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findUniqueOrThrow
   */
  export type SystemSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findFirst
   */
  export type SystemSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findFirstOrThrow
   */
  export type SystemSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findMany
   */
  export type SystemSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting create
   */
  export type SystemSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemSetting.
     */
    data: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
  }

  /**
   * SystemSetting createMany
   */
  export type SystemSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting createManyAndReturn
   */
  export type SystemSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting update
   */
  export type SystemSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemSetting.
     */
    data: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
    /**
     * Choose, which SystemSetting to update.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting updateMany
   */
  export type SystemSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number
  }

  /**
   * SystemSetting updateManyAndReturn
   */
  export type SystemSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number
  }

  /**
   * SystemSetting upsert
   */
  export type SystemSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemSetting to update in case it exists.
     */
    where: SystemSettingWhereUniqueInput
    /**
     * In case the SystemSetting found by the `where` argument doesn't exist, create a new SystemSetting with this data.
     */
    create: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
    /**
     * In case the SystemSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
  }

  /**
   * SystemSetting delete
   */
  export type SystemSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter which SystemSetting to delete.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting deleteMany
   */
  export type SystemSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to delete.
     */
    limit?: number
  }

  /**
   * SystemSetting without action
   */
  export type SystemSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phoneNumber: 'phoneNumber',
    name: 'name',
    avatar: 'avatar',
    role: 'role',
    isEmailVerified: 'isEmailVerified',
    isPhoneVerified: 'isPhoneVerified',
    lastLoginAt: 'lastLoginAt',
    twoFactorEnabled: 'twoFactorEnabled',
    twoFactorSecret: 'twoFactorSecret',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    balance: 'balance',
    currency: 'currency',
    accountNumber: 'accountNumber',
    isActive: 'isActive',
    dailyLimit: 'dailyLimit',
    monthlyLimit: 'monthlyLimit',
    currentDailyUsage: 'currentDailyUsage',
    currentMonthlyUsage: 'currentMonthlyUsage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    walletId: 'walletId',
    fromWalletId: 'fromWalletId',
    toWalletId: 'toWalletId',
    referenceCode: 'referenceCode',
    failureReason: 'failureReason',
    recipientName: 'recipientName',
    senderName: 'senderName',
    type: 'type',
    status: 'status',
    amount: 'amount',
    fee: 'fee',
    currency: 'currency',
    referenceId: 'referenceId',
    description: 'description',
    metadata: 'metadata',
    completedAt: 'completedAt',
    cancelledAt: 'cancelledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const TransferScalarFieldEnum: {
    id: 'id',
    fromUserId: 'fromUserId',
    toUserId: 'toUserId',
    fromWalletId: 'fromWalletId',
    toWalletId: 'toWalletId',
    amount: 'amount',
    fee: 'fee',
    status: 'status',
    reference: 'reference',
    transactionId: 'transactionId',
    counterpartTransactionId: 'counterpartTransactionId',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransferScalarFieldEnum = (typeof TransferScalarFieldEnum)[keyof typeof TransferScalarFieldEnum]


  export const TopUpScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    walletId: 'walletId',
    amount: 'amount',
    method: 'method',
    status: 'status',
    externalReference: 'externalReference',
    transactionId: 'transactionId',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TopUpScalarFieldEnum = (typeof TopUpScalarFieldEnum)[keyof typeof TopUpScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    walletId: 'walletId',
    amount: 'amount',
    fee: 'fee',
    type: 'type',
    merchantId: 'merchantId',
    billCode: 'billCode',
    description: 'description',
    status: 'status',
    transactionId: 'transactionId',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    readAt: 'readAt',
    link: 'link',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    role: 'role',
    permissions: 'permissions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const UserSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    deviceInfo: 'deviceInfo',
    ipAddress: 'ipAddress',
    expiresAt: 'expiresAt',
    isRevoked: 'isRevoked',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserSessionScalarFieldEnum = (typeof UserSessionScalarFieldEnum)[keyof typeof UserSessionScalarFieldEnum]


  export const SystemSettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Currency'
   */
  export type EnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency'>
    


  /**
   * Reference to a field of type 'Currency[]'
   */
  export type ListEnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'TransactionStatus'
   */
  export type EnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus'>
    


  /**
   * Reference to a field of type 'TransactionStatus[]'
   */
  export type ListEnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TopUpMethod'
   */
  export type EnumTopUpMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TopUpMethod'>
    


  /**
   * Reference to a field of type 'TopUpMethod[]'
   */
  export type ListEnumTopUpMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TopUpMethod[]'>
    


  /**
   * Reference to a field of type 'PaymentType'
   */
  export type EnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType'>
    


  /**
   * Reference to a field of type 'PaymentType[]'
   */
  export type ListEnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'AdminRole'
   */
  export type EnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole'>
    


  /**
   * Reference to a field of type 'AdminRole[]'
   */
  export type ListEnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isEmailVerified?: BoolFilter<"User"> | boolean
    isPhoneVerified?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    twoFactorEnabled?: BoolNullableFilter<"User"> | boolean | null
    twoFactorSecret?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    wallets?: WalletListRelationFilter
    transactions?: TransactionListRelationFilter
    transfersSent?: TransferListRelationFilter
    transfersRecv?: TransferListRelationFilter
    topUps?: TopUpListRelationFilter
    payments?: PaymentListRelationFilter
    notifications?: NotificationListRelationFilter
    adminProfile?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    sessions?: UserSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    name?: SortOrder
    avatar?: SortOrderInput | SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isPhoneVerified?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    twoFactorEnabled?: SortOrderInput | SortOrder
    twoFactorSecret?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    wallets?: WalletOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    transfersSent?: TransferOrderByRelationAggregateInput
    transfersRecv?: TransferOrderByRelationAggregateInput
    topUps?: TopUpOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    adminProfile?: AdminOrderByWithRelationInput
    sessions?: UserSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phoneNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isEmailVerified?: BoolFilter<"User"> | boolean
    isPhoneVerified?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    twoFactorEnabled?: BoolNullableFilter<"User"> | boolean | null
    twoFactorSecret?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    wallets?: WalletListRelationFilter
    transactions?: TransactionListRelationFilter
    transfersSent?: TransferListRelationFilter
    transfersRecv?: TransferListRelationFilter
    topUps?: TopUpListRelationFilter
    payments?: PaymentListRelationFilter
    notifications?: NotificationListRelationFilter
    adminProfile?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    sessions?: UserSessionListRelationFilter
  }, "id" | "email" | "phoneNumber">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    name?: SortOrder
    avatar?: SortOrderInput | SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isPhoneVerified?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    twoFactorEnabled?: SortOrderInput | SortOrder
    twoFactorSecret?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isPhoneVerified?: BoolWithAggregatesFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    twoFactorEnabled?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    twoFactorSecret?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringFilter<"Wallet"> | string
    balance?: IntFilter<"Wallet"> | number
    currency?: EnumCurrencyFilter<"Wallet"> | $Enums.Currency
    accountNumber?: StringFilter<"Wallet"> | string
    isActive?: BoolFilter<"Wallet"> | boolean
    dailyLimit?: IntNullableFilter<"Wallet"> | number | null
    monthlyLimit?: IntNullableFilter<"Wallet"> | number | null
    currentDailyUsage?: IntNullableFilter<"Wallet"> | number | null
    currentMonthlyUsage?: IntNullableFilter<"Wallet"> | number | null
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
    transfersFrom?: TransferListRelationFilter
    transfersTo?: TransferListRelationFilter
    topUps?: TopUpListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    accountNumber?: SortOrder
    isActive?: SortOrder
    dailyLimit?: SortOrderInput | SortOrder
    monthlyLimit?: SortOrderInput | SortOrder
    currentDailyUsage?: SortOrderInput | SortOrder
    currentMonthlyUsage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
    transfersFrom?: TransferOrderByRelationAggregateInput
    transfersTo?: TransferOrderByRelationAggregateInput
    topUps?: TopUpOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    accountNumber?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    userId?: StringFilter<"Wallet"> | string
    balance?: IntFilter<"Wallet"> | number
    currency?: EnumCurrencyFilter<"Wallet"> | $Enums.Currency
    isActive?: BoolFilter<"Wallet"> | boolean
    dailyLimit?: IntNullableFilter<"Wallet"> | number | null
    monthlyLimit?: IntNullableFilter<"Wallet"> | number | null
    currentDailyUsage?: IntNullableFilter<"Wallet"> | number | null
    currentMonthlyUsage?: IntNullableFilter<"Wallet"> | number | null
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
    transfersFrom?: TransferListRelationFilter
    transfersTo?: TransferListRelationFilter
    topUps?: TopUpListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "accountNumber">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    accountNumber?: SortOrder
    isActive?: SortOrder
    dailyLimit?: SortOrderInput | SortOrder
    monthlyLimit?: SortOrderInput | SortOrder
    currentDailyUsage?: SortOrderInput | SortOrder
    currentMonthlyUsage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _avg?: WalletAvgOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
    _sum?: WalletSumOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    userId?: StringWithAggregatesFilter<"Wallet"> | string
    balance?: IntWithAggregatesFilter<"Wallet"> | number
    currency?: EnumCurrencyWithAggregatesFilter<"Wallet"> | $Enums.Currency
    accountNumber?: StringWithAggregatesFilter<"Wallet"> | string
    isActive?: BoolWithAggregatesFilter<"Wallet"> | boolean
    dailyLimit?: IntNullableWithAggregatesFilter<"Wallet"> | number | null
    monthlyLimit?: IntNullableWithAggregatesFilter<"Wallet"> | number | null
    currentDailyUsage?: IntNullableWithAggregatesFilter<"Wallet"> | number | null
    currentMonthlyUsage?: IntNullableWithAggregatesFilter<"Wallet"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    fromWalletId?: StringNullableFilter<"Transaction"> | string | null
    toWalletId?: StringNullableFilter<"Transaction"> | string | null
    referenceCode?: StringNullableFilter<"Transaction"> | string | null
    failureReason?: StringNullableFilter<"Transaction"> | string | null
    recipientName?: StringNullableFilter<"Transaction"> | string | null
    senderName?: StringNullableFilter<"Transaction"> | string | null
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    amount?: IntFilter<"Transaction"> | number
    fee?: IntNullableFilter<"Transaction"> | number | null
    currency?: EnumCurrencyFilter<"Transaction"> | $Enums.Currency
    referenceId?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    completedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    fromWalletId?: SortOrderInput | SortOrder
    toWalletId?: SortOrderInput | SortOrder
    referenceCode?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    recipientName?: SortOrderInput | SortOrder
    senderName?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    fee?: SortOrderInput | SortOrder
    currency?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    wallet?: WalletOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    referenceCode?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    userId?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    fromWalletId?: StringNullableFilter<"Transaction"> | string | null
    toWalletId?: StringNullableFilter<"Transaction"> | string | null
    failureReason?: StringNullableFilter<"Transaction"> | string | null
    recipientName?: StringNullableFilter<"Transaction"> | string | null
    senderName?: StringNullableFilter<"Transaction"> | string | null
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    amount?: IntFilter<"Transaction"> | number
    fee?: IntNullableFilter<"Transaction"> | number | null
    currency?: EnumCurrencyFilter<"Transaction"> | $Enums.Currency
    referenceId?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    completedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }, "id" | "referenceCode">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    fromWalletId?: SortOrderInput | SortOrder
    toWalletId?: SortOrderInput | SortOrder
    referenceCode?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    recipientName?: SortOrderInput | SortOrder
    senderName?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    fee?: SortOrderInput | SortOrder
    currency?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    walletId?: StringWithAggregatesFilter<"Transaction"> | string
    fromWalletId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    toWalletId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    referenceCode?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    failureReason?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    recipientName?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    senderName?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    status?: EnumTransactionStatusWithAggregatesFilter<"Transaction"> | $Enums.TransactionStatus
    amount?: IntWithAggregatesFilter<"Transaction"> | number
    fee?: IntNullableWithAggregatesFilter<"Transaction"> | number | null
    currency?: EnumCurrencyWithAggregatesFilter<"Transaction"> | $Enums.Currency
    referenceId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    description?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Transaction">
    completedAt?: DateTimeNullableWithAggregatesFilter<"Transaction"> | Date | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"Transaction"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type TransferWhereInput = {
    AND?: TransferWhereInput | TransferWhereInput[]
    OR?: TransferWhereInput[]
    NOT?: TransferWhereInput | TransferWhereInput[]
    id?: StringFilter<"Transfer"> | string
    fromUserId?: StringFilter<"Transfer"> | string
    toUserId?: StringFilter<"Transfer"> | string
    fromWalletId?: StringFilter<"Transfer"> | string
    toWalletId?: StringFilter<"Transfer"> | string
    amount?: IntFilter<"Transfer"> | number
    fee?: IntNullableFilter<"Transfer"> | number | null
    status?: EnumTransactionStatusFilter<"Transfer"> | $Enums.TransactionStatus
    reference?: StringNullableFilter<"Transfer"> | string | null
    transactionId?: StringFilter<"Transfer"> | string
    counterpartTransactionId?: StringFilter<"Transfer"> | string
    completedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    createdAt?: DateTimeFilter<"Transfer"> | Date | string
    updatedAt?: DateTimeFilter<"Transfer"> | Date | string
    fromUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    fromWallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    toWallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }

  export type TransferOrderByWithRelationInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    fromWalletId?: SortOrder
    toWalletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrderInput | SortOrder
    status?: SortOrder
    reference?: SortOrderInput | SortOrder
    transactionId?: SortOrder
    counterpartTransactionId?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromUser?: UserOrderByWithRelationInput
    toUser?: UserOrderByWithRelationInput
    fromWallet?: WalletOrderByWithRelationInput
    toWallet?: WalletOrderByWithRelationInput
  }

  export type TransferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId?: string
    counterpartTransactionId?: string
    AND?: TransferWhereInput | TransferWhereInput[]
    OR?: TransferWhereInput[]
    NOT?: TransferWhereInput | TransferWhereInput[]
    fromUserId?: StringFilter<"Transfer"> | string
    toUserId?: StringFilter<"Transfer"> | string
    fromWalletId?: StringFilter<"Transfer"> | string
    toWalletId?: StringFilter<"Transfer"> | string
    amount?: IntFilter<"Transfer"> | number
    fee?: IntNullableFilter<"Transfer"> | number | null
    status?: EnumTransactionStatusFilter<"Transfer"> | $Enums.TransactionStatus
    reference?: StringNullableFilter<"Transfer"> | string | null
    completedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    createdAt?: DateTimeFilter<"Transfer"> | Date | string
    updatedAt?: DateTimeFilter<"Transfer"> | Date | string
    fromUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    fromWallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    toWallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }, "id" | "transactionId" | "counterpartTransactionId">

  export type TransferOrderByWithAggregationInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    fromWalletId?: SortOrder
    toWalletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrderInput | SortOrder
    status?: SortOrder
    reference?: SortOrderInput | SortOrder
    transactionId?: SortOrder
    counterpartTransactionId?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransferCountOrderByAggregateInput
    _avg?: TransferAvgOrderByAggregateInput
    _max?: TransferMaxOrderByAggregateInput
    _min?: TransferMinOrderByAggregateInput
    _sum?: TransferSumOrderByAggregateInput
  }

  export type TransferScalarWhereWithAggregatesInput = {
    AND?: TransferScalarWhereWithAggregatesInput | TransferScalarWhereWithAggregatesInput[]
    OR?: TransferScalarWhereWithAggregatesInput[]
    NOT?: TransferScalarWhereWithAggregatesInput | TransferScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transfer"> | string
    fromUserId?: StringWithAggregatesFilter<"Transfer"> | string
    toUserId?: StringWithAggregatesFilter<"Transfer"> | string
    fromWalletId?: StringWithAggregatesFilter<"Transfer"> | string
    toWalletId?: StringWithAggregatesFilter<"Transfer"> | string
    amount?: IntWithAggregatesFilter<"Transfer"> | number
    fee?: IntNullableWithAggregatesFilter<"Transfer"> | number | null
    status?: EnumTransactionStatusWithAggregatesFilter<"Transfer"> | $Enums.TransactionStatus
    reference?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    transactionId?: StringWithAggregatesFilter<"Transfer"> | string
    counterpartTransactionId?: StringWithAggregatesFilter<"Transfer"> | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Transfer"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transfer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transfer"> | Date | string
  }

  export type TopUpWhereInput = {
    AND?: TopUpWhereInput | TopUpWhereInput[]
    OR?: TopUpWhereInput[]
    NOT?: TopUpWhereInput | TopUpWhereInput[]
    id?: StringFilter<"TopUp"> | string
    userId?: StringFilter<"TopUp"> | string
    walletId?: StringFilter<"TopUp"> | string
    amount?: IntFilter<"TopUp"> | number
    method?: EnumTopUpMethodFilter<"TopUp"> | $Enums.TopUpMethod
    status?: EnumTransactionStatusFilter<"TopUp"> | $Enums.TransactionStatus
    externalReference?: StringNullableFilter<"TopUp"> | string | null
    transactionId?: StringFilter<"TopUp"> | string
    completedAt?: DateTimeNullableFilter<"TopUp"> | Date | string | null
    createdAt?: DateTimeFilter<"TopUp"> | Date | string
    updatedAt?: DateTimeFilter<"TopUp"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }

  export type TopUpOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    externalReference?: SortOrderInput | SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    wallet?: WalletOrderByWithRelationInput
  }

  export type TopUpWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId?: string
    AND?: TopUpWhereInput | TopUpWhereInput[]
    OR?: TopUpWhereInput[]
    NOT?: TopUpWhereInput | TopUpWhereInput[]
    userId?: StringFilter<"TopUp"> | string
    walletId?: StringFilter<"TopUp"> | string
    amount?: IntFilter<"TopUp"> | number
    method?: EnumTopUpMethodFilter<"TopUp"> | $Enums.TopUpMethod
    status?: EnumTransactionStatusFilter<"TopUp"> | $Enums.TransactionStatus
    externalReference?: StringNullableFilter<"TopUp"> | string | null
    completedAt?: DateTimeNullableFilter<"TopUp"> | Date | string | null
    createdAt?: DateTimeFilter<"TopUp"> | Date | string
    updatedAt?: DateTimeFilter<"TopUp"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }, "id" | "transactionId">

  export type TopUpOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    externalReference?: SortOrderInput | SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TopUpCountOrderByAggregateInput
    _avg?: TopUpAvgOrderByAggregateInput
    _max?: TopUpMaxOrderByAggregateInput
    _min?: TopUpMinOrderByAggregateInput
    _sum?: TopUpSumOrderByAggregateInput
  }

  export type TopUpScalarWhereWithAggregatesInput = {
    AND?: TopUpScalarWhereWithAggregatesInput | TopUpScalarWhereWithAggregatesInput[]
    OR?: TopUpScalarWhereWithAggregatesInput[]
    NOT?: TopUpScalarWhereWithAggregatesInput | TopUpScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TopUp"> | string
    userId?: StringWithAggregatesFilter<"TopUp"> | string
    walletId?: StringWithAggregatesFilter<"TopUp"> | string
    amount?: IntWithAggregatesFilter<"TopUp"> | number
    method?: EnumTopUpMethodWithAggregatesFilter<"TopUp"> | $Enums.TopUpMethod
    status?: EnumTransactionStatusWithAggregatesFilter<"TopUp"> | $Enums.TransactionStatus
    externalReference?: StringNullableWithAggregatesFilter<"TopUp"> | string | null
    transactionId?: StringWithAggregatesFilter<"TopUp"> | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"TopUp"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TopUp"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TopUp"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    walletId?: StringFilter<"Payment"> | string
    amount?: IntFilter<"Payment"> | number
    fee?: IntNullableFilter<"Payment"> | number | null
    type?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    merchantId?: StringNullableFilter<"Payment"> | string | null
    billCode?: StringNullableFilter<"Payment"> | string | null
    description?: StringNullableFilter<"Payment"> | string | null
    status?: EnumTransactionStatusFilter<"Payment"> | $Enums.TransactionStatus
    transactionId?: StringFilter<"Payment"> | string
    completedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrderInput | SortOrder
    type?: SortOrder
    merchantId?: SortOrderInput | SortOrder
    billCode?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    wallet?: WalletOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    userId?: StringFilter<"Payment"> | string
    walletId?: StringFilter<"Payment"> | string
    amount?: IntFilter<"Payment"> | number
    fee?: IntNullableFilter<"Payment"> | number | null
    type?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    merchantId?: StringNullableFilter<"Payment"> | string | null
    billCode?: StringNullableFilter<"Payment"> | string | null
    description?: StringNullableFilter<"Payment"> | string | null
    status?: EnumTransactionStatusFilter<"Payment"> | $Enums.TransactionStatus
    completedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }, "id" | "transactionId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrderInput | SortOrder
    type?: SortOrder
    merchantId?: SortOrderInput | SortOrder
    billCode?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    userId?: StringWithAggregatesFilter<"Payment"> | string
    walletId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: IntWithAggregatesFilter<"Payment"> | number
    fee?: IntNullableWithAggregatesFilter<"Payment"> | number | null
    type?: EnumPaymentTypeWithAggregatesFilter<"Payment"> | $Enums.PaymentType
    merchantId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    billCode?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    description?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    status?: EnumTransactionStatusWithAggregatesFilter<"Payment"> | $Enums.TransactionStatus
    transactionId?: StringWithAggregatesFilter<"Payment"> | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    link?: StringNullableFilter<"Notification"> | string | null
    metadata?: JsonNullableFilter<"Notification">
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    readAt?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    link?: StringNullableFilter<"Notification"> | string | null
    metadata?: JsonNullableFilter<"Notification">
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    readAt?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    readAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    link?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Notification">
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    userId?: StringFilter<"Admin"> | string
    role?: EnumAdminRoleFilter<"Admin"> | $Enums.AdminRole
    permissions?: StringNullableListFilter<"Admin">
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Admin"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    role?: EnumAdminRoleFilter<"Admin"> | $Enums.AdminRole
    permissions?: StringNullableListFilter<"Admin">
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Admin"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    userId?: StringWithAggregatesFilter<"Admin"> | string
    role?: EnumAdminRoleWithAggregatesFilter<"Admin"> | $Enums.AdminRole
    permissions?: StringNullableListFilter<"Admin">
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Admin"> | Date | string | null
  }

  export type UserSessionWhereInput = {
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    id?: StringFilter<"UserSession"> | string
    userId?: StringFilter<"UserSession"> | string
    token?: StringFilter<"UserSession"> | string
    deviceInfo?: StringNullableFilter<"UserSession"> | string | null
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    isRevoked?: BoolFilter<"UserSession"> | boolean
    revokedAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    userId?: StringFilter<"UserSession"> | string
    deviceInfo?: StringNullableFilter<"UserSession"> | string | null
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    isRevoked?: BoolFilter<"UserSession"> | boolean
    revokedAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type UserSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserSessionCountOrderByAggregateInput
    _max?: UserSessionMaxOrderByAggregateInput
    _min?: UserSessionMinOrderByAggregateInput
  }

  export type UserSessionScalarWhereWithAggregatesInput = {
    AND?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    OR?: UserSessionScalarWhereWithAggregatesInput[]
    NOT?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSession"> | string
    userId?: StringWithAggregatesFilter<"UserSession"> | string
    token?: StringWithAggregatesFilter<"UserSession"> | string
    deviceInfo?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    isRevoked?: BoolWithAggregatesFilter<"UserSession"> | boolean
    revokedAt?: DateTimeNullableWithAggregatesFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
  }

  export type SystemSettingWhereInput = {
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    id?: StringFilter<"SystemSetting"> | string
    key?: StringFilter<"SystemSetting"> | string
    value?: JsonFilter<"SystemSetting">
    description?: StringNullableFilter<"SystemSetting"> | string | null
    isPublic?: BoolFilter<"SystemSetting"> | boolean
    createdAt?: DateTimeFilter<"SystemSetting"> | Date | string
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }

  export type SystemSettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    value?: JsonFilter<"SystemSetting">
    description?: StringNullableFilter<"SystemSetting"> | string | null
    isPublic?: BoolFilter<"SystemSetting"> | boolean
    createdAt?: DateTimeFilter<"SystemSetting"> | Date | string
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }, "id" | "key">

  export type SystemSettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemSettingCountOrderByAggregateInput
    _max?: SystemSettingMaxOrderByAggregateInput
    _min?: SystemSettingMinOrderByAggregateInput
  }

  export type SystemSettingScalarWhereWithAggregatesInput = {
    AND?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    OR?: SystemSettingScalarWhereWithAggregatesInput[]
    NOT?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemSetting"> | string
    key?: StringWithAggregatesFilter<"SystemSetting"> | string
    value?: JsonWithAggregatesFilter<"SystemSetting">
    description?: StringNullableWithAggregatesFilter<"SystemSetting"> | string | null
    isPublic?: BoolWithAggregatesFilter<"SystemSetting"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SystemSetting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemSetting"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletCreateInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferCreateNestedManyWithoutToWalletInput
    topUps?: TopUpCreateNestedManyWithoutWalletInput
    payments?: PaymentCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    userId: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToWalletInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutWalletInput
    payments?: PaymentUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUpdateManyWithoutWalletNestedInput
    payments?: PaymentUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutWalletNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletCreateManyInput = {
    id?: string
    userId: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    wallet: WalletCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    userId: string
    walletId: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    userId: string
    walletId: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferCreateInput = {
    id?: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutTransfersSentInput
    toUser: UserCreateNestedOneWithoutTransfersRecvInput
    fromWallet: WalletCreateNestedOneWithoutTransfersFromInput
    toWallet: WalletCreateNestedOneWithoutTransfersToInput
  }

  export type TransferUncheckedCreateInput = {
    id?: string
    fromUserId: string
    toUserId: string
    fromWalletId: string
    toWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutTransfersSentNestedInput
    toUser?: UserUpdateOneRequiredWithoutTransfersRecvNestedInput
    fromWallet?: WalletUpdateOneRequiredWithoutTransfersFromNestedInput
    toWallet?: WalletUpdateOneRequiredWithoutTransfersToNestedInput
  }

  export type TransferUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: StringFieldUpdateOperationsInput | string
    toWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferCreateManyInput = {
    id?: string
    fromUserId: string
    toUserId: string
    fromWalletId: string
    toWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: StringFieldUpdateOperationsInput | string
    toWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopUpCreateInput = {
    id?: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTopUpsInput
    wallet: WalletCreateNestedOneWithoutTopUpsInput
  }

  export type TopUpUncheckedCreateInput = {
    id?: string
    userId: string
    walletId: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TopUpUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTopUpsNestedInput
    wallet?: WalletUpdateOneRequiredWithoutTopUpsNestedInput
  }

  export type TopUpUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopUpCreateManyInput = {
    id?: string
    userId: string
    walletId: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TopUpUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopUpUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentsInput
    wallet: WalletCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    userId: string
    walletId: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    wallet?: WalletUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    userId: string
    walletId: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    readAt?: Date | string | null
    link?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    readAt?: Date | string | null
    link?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    readAt?: Date | string | null
    link?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    id?: string
    role: $Enums.AdminRole
    permissions?: AdminCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAdminProfileInput
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    userId: string
    role: $Enums.AdminRole
    permissions?: AdminCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAdminProfileNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminCreateManyInput = {
    id?: string
    userId: string
    role: $Enums.AdminRole
    permissions?: AdminCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserSessionCreateInput = {
    id?: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type UserSessionUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type UserSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateManyInput = {
    id?: string
    userId: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingUncheckedCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateManyInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WalletListRelationFilter = {
    every?: WalletWhereInput
    some?: WalletWhereInput
    none?: WalletWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type TransferListRelationFilter = {
    every?: TransferWhereInput
    some?: TransferWhereInput
    none?: TransferWhereInput
  }

  export type TopUpListRelationFilter = {
    every?: TopUpWhereInput
    some?: TopUpWhereInput
    none?: TopUpWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type AdminNullableScalarRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type UserSessionListRelationFilter = {
    every?: UserSessionWhereInput
    some?: UserSessionWhereInput
    none?: UserSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TopUpOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isPhoneVerified?: SortOrder
    lastLoginAt?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorSecret?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isPhoneVerified?: SortOrder
    lastLoginAt?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorSecret?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    isPhoneVerified?: SortOrder
    lastLoginAt?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorSecret?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    accountNumber?: SortOrder
    isActive?: SortOrder
    dailyLimit?: SortOrder
    monthlyLimit?: SortOrder
    currentDailyUsage?: SortOrder
    currentMonthlyUsage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletAvgOrderByAggregateInput = {
    balance?: SortOrder
    dailyLimit?: SortOrder
    monthlyLimit?: SortOrder
    currentDailyUsage?: SortOrder
    currentMonthlyUsage?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    accountNumber?: SortOrder
    isActive?: SortOrder
    dailyLimit?: SortOrder
    monthlyLimit?: SortOrder
    currentDailyUsage?: SortOrder
    currentMonthlyUsage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    accountNumber?: SortOrder
    isActive?: SortOrder
    dailyLimit?: SortOrder
    monthlyLimit?: SortOrder
    currentDailyUsage?: SortOrder
    currentMonthlyUsage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletSumOrderByAggregateInput = {
    balance?: SortOrder
    dailyLimit?: SortOrder
    monthlyLimit?: SortOrder
    currentDailyUsage?: SortOrder
    currentMonthlyUsage?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyFilter<$PrismaModel>
    _max?: NestedEnumCurrencyFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type EnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WalletScalarRelationFilter = {
    is?: WalletWhereInput
    isNot?: WalletWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    fromWalletId?: SortOrder
    toWalletId?: SortOrder
    referenceCode?: SortOrder
    failureReason?: SortOrder
    recipientName?: SortOrder
    senderName?: SortOrder
    type?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    currency?: SortOrder
    referenceId?: SortOrder
    description?: SortOrder
    metadata?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    fee?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    fromWalletId?: SortOrder
    toWalletId?: SortOrder
    referenceCode?: SortOrder
    failureReason?: SortOrder
    recipientName?: SortOrder
    senderName?: SortOrder
    type?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    currency?: SortOrder
    referenceId?: SortOrder
    description?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    fromWalletId?: SortOrder
    toWalletId?: SortOrder
    referenceCode?: SortOrder
    failureReason?: SortOrder
    recipientName?: SortOrder
    senderName?: SortOrder
    type?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    currency?: SortOrder
    referenceId?: SortOrder
    description?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    fee?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type EnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type TransferCountOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    fromWalletId?: SortOrder
    toWalletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    status?: SortOrder
    reference?: SortOrder
    transactionId?: SortOrder
    counterpartTransactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransferAvgOrderByAggregateInput = {
    amount?: SortOrder
    fee?: SortOrder
  }

  export type TransferMaxOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    fromWalletId?: SortOrder
    toWalletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    status?: SortOrder
    reference?: SortOrder
    transactionId?: SortOrder
    counterpartTransactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransferMinOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    fromWalletId?: SortOrder
    toWalletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    status?: SortOrder
    reference?: SortOrder
    transactionId?: SortOrder
    counterpartTransactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransferSumOrderByAggregateInput = {
    amount?: SortOrder
    fee?: SortOrder
  }

  export type EnumTopUpMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.TopUpMethod | EnumTopUpMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TopUpMethod[] | ListEnumTopUpMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.TopUpMethod[] | ListEnumTopUpMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumTopUpMethodFilter<$PrismaModel> | $Enums.TopUpMethod
  }

  export type TopUpCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    externalReference?: SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TopUpAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TopUpMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    externalReference?: SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TopUpMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    externalReference?: SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TopUpSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumTopUpMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TopUpMethod | EnumTopUpMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TopUpMethod[] | ListEnumTopUpMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.TopUpMethod[] | ListEnumTopUpMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumTopUpMethodWithAggregatesFilter<$PrismaModel> | $Enums.TopUpMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTopUpMethodFilter<$PrismaModel>
    _max?: NestedEnumTopUpMethodFilter<$PrismaModel>
  }

  export type EnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    type?: SortOrder
    merchantId?: SortOrder
    billCode?: SortOrder
    description?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    fee?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    type?: SortOrder
    merchantId?: SortOrder
    billCode?: SortOrder
    description?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletId?: SortOrder
    amount?: SortOrder
    fee?: SortOrder
    type?: SortOrder
    merchantId?: SortOrder
    billCode?: SortOrder
    description?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    fee?: SortOrder
  }

  export type EnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    readAt?: SortOrder
    link?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    readAt?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    readAt?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type EnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type EnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleFilter<$PrismaModel>
  }

  export type UserSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SystemSettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type WalletCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransferCreateNestedManyWithoutFromUserInput = {
    create?: XOR<TransferCreateWithoutFromUserInput, TransferUncheckedCreateWithoutFromUserInput> | TransferCreateWithoutFromUserInput[] | TransferUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromUserInput | TransferCreateOrConnectWithoutFromUserInput[]
    createMany?: TransferCreateManyFromUserInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TransferCreateNestedManyWithoutToUserInput = {
    create?: XOR<TransferCreateWithoutToUserInput, TransferUncheckedCreateWithoutToUserInput> | TransferCreateWithoutToUserInput[] | TransferUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToUserInput | TransferCreateOrConnectWithoutToUserInput[]
    createMany?: TransferCreateManyToUserInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TopUpCreateNestedManyWithoutUserInput = {
    create?: XOR<TopUpCreateWithoutUserInput, TopUpUncheckedCreateWithoutUserInput> | TopUpCreateWithoutUserInput[] | TopUpUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TopUpCreateOrConnectWithoutUserInput | TopUpCreateOrConnectWithoutUserInput[]
    createMany?: TopUpCreateManyUserInputEnvelope
    connect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AdminCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type UserSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransferUncheckedCreateNestedManyWithoutFromUserInput = {
    create?: XOR<TransferCreateWithoutFromUserInput, TransferUncheckedCreateWithoutFromUserInput> | TransferCreateWithoutFromUserInput[] | TransferUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromUserInput | TransferCreateOrConnectWithoutFromUserInput[]
    createMany?: TransferCreateManyFromUserInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TransferUncheckedCreateNestedManyWithoutToUserInput = {
    create?: XOR<TransferCreateWithoutToUserInput, TransferUncheckedCreateWithoutToUserInput> | TransferCreateWithoutToUserInput[] | TransferUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToUserInput | TransferCreateOrConnectWithoutToUserInput[]
    createMany?: TransferCreateManyToUserInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TopUpUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TopUpCreateWithoutUserInput, TopUpUncheckedCreateWithoutUserInput> | TopUpCreateWithoutUserInput[] | TopUpUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TopUpCreateOrConnectWithoutUserInput | TopUpCreateOrConnectWithoutUserInput[]
    createMany?: TopUpCreateManyUserInputEnvelope
    connect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AdminUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type UserSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransferUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<TransferCreateWithoutFromUserInput, TransferUncheckedCreateWithoutFromUserInput> | TransferCreateWithoutFromUserInput[] | TransferUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromUserInput | TransferCreateOrConnectWithoutFromUserInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutFromUserInput | TransferUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: TransferCreateManyFromUserInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutFromUserInput | TransferUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutFromUserInput | TransferUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TransferUpdateManyWithoutToUserNestedInput = {
    create?: XOR<TransferCreateWithoutToUserInput, TransferUncheckedCreateWithoutToUserInput> | TransferCreateWithoutToUserInput[] | TransferUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToUserInput | TransferCreateOrConnectWithoutToUserInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutToUserInput | TransferUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: TransferCreateManyToUserInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutToUserInput | TransferUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutToUserInput | TransferUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TopUpUpdateManyWithoutUserNestedInput = {
    create?: XOR<TopUpCreateWithoutUserInput, TopUpUncheckedCreateWithoutUserInput> | TopUpCreateWithoutUserInput[] | TopUpUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TopUpCreateOrConnectWithoutUserInput | TopUpCreateOrConnectWithoutUserInput[]
    upsert?: TopUpUpsertWithWhereUniqueWithoutUserInput | TopUpUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TopUpCreateManyUserInputEnvelope
    set?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    disconnect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    delete?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    connect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    update?: TopUpUpdateWithWhereUniqueWithoutUserInput | TopUpUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TopUpUpdateManyWithWhereWithoutUserInput | TopUpUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TopUpScalarWhereInput | TopUpScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AdminUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type WalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransferUncheckedUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<TransferCreateWithoutFromUserInput, TransferUncheckedCreateWithoutFromUserInput> | TransferCreateWithoutFromUserInput[] | TransferUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromUserInput | TransferCreateOrConnectWithoutFromUserInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutFromUserInput | TransferUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: TransferCreateManyFromUserInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutFromUserInput | TransferUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutFromUserInput | TransferUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TransferUncheckedUpdateManyWithoutToUserNestedInput = {
    create?: XOR<TransferCreateWithoutToUserInput, TransferUncheckedCreateWithoutToUserInput> | TransferCreateWithoutToUserInput[] | TransferUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToUserInput | TransferCreateOrConnectWithoutToUserInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutToUserInput | TransferUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: TransferCreateManyToUserInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutToUserInput | TransferUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutToUserInput | TransferUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TopUpUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TopUpCreateWithoutUserInput, TopUpUncheckedCreateWithoutUserInput> | TopUpCreateWithoutUserInput[] | TopUpUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TopUpCreateOrConnectWithoutUserInput | TopUpCreateOrConnectWithoutUserInput[]
    upsert?: TopUpUpsertWithWhereUniqueWithoutUserInput | TopUpUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TopUpCreateManyUserInputEnvelope
    set?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    disconnect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    delete?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    connect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    update?: TopUpUpdateWithWhereUniqueWithoutUserInput | TopUpUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TopUpUpdateManyWithWhereWithoutUserInput | TopUpUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TopUpScalarWhereInput | TopUpScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AdminUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWalletsInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransferCreateNestedManyWithoutFromWalletInput = {
    create?: XOR<TransferCreateWithoutFromWalletInput, TransferUncheckedCreateWithoutFromWalletInput> | TransferCreateWithoutFromWalletInput[] | TransferUncheckedCreateWithoutFromWalletInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromWalletInput | TransferCreateOrConnectWithoutFromWalletInput[]
    createMany?: TransferCreateManyFromWalletInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TransferCreateNestedManyWithoutToWalletInput = {
    create?: XOR<TransferCreateWithoutToWalletInput, TransferUncheckedCreateWithoutToWalletInput> | TransferCreateWithoutToWalletInput[] | TransferUncheckedCreateWithoutToWalletInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToWalletInput | TransferCreateOrConnectWithoutToWalletInput[]
    createMany?: TransferCreateManyToWalletInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TopUpCreateNestedManyWithoutWalletInput = {
    create?: XOR<TopUpCreateWithoutWalletInput, TopUpUncheckedCreateWithoutWalletInput> | TopUpCreateWithoutWalletInput[] | TopUpUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TopUpCreateOrConnectWithoutWalletInput | TopUpCreateOrConnectWithoutWalletInput[]
    createMany?: TopUpCreateManyWalletInputEnvelope
    connect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutWalletInput = {
    create?: XOR<PaymentCreateWithoutWalletInput, PaymentUncheckedCreateWithoutWalletInput> | PaymentCreateWithoutWalletInput[] | PaymentUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutWalletInput | PaymentCreateOrConnectWithoutWalletInput[]
    createMany?: PaymentCreateManyWalletInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransferUncheckedCreateNestedManyWithoutFromWalletInput = {
    create?: XOR<TransferCreateWithoutFromWalletInput, TransferUncheckedCreateWithoutFromWalletInput> | TransferCreateWithoutFromWalletInput[] | TransferUncheckedCreateWithoutFromWalletInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromWalletInput | TransferCreateOrConnectWithoutFromWalletInput[]
    createMany?: TransferCreateManyFromWalletInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TransferUncheckedCreateNestedManyWithoutToWalletInput = {
    create?: XOR<TransferCreateWithoutToWalletInput, TransferUncheckedCreateWithoutToWalletInput> | TransferCreateWithoutToWalletInput[] | TransferUncheckedCreateWithoutToWalletInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToWalletInput | TransferCreateOrConnectWithoutToWalletInput[]
    createMany?: TransferCreateManyToWalletInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TopUpUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<TopUpCreateWithoutWalletInput, TopUpUncheckedCreateWithoutWalletInput> | TopUpCreateWithoutWalletInput[] | TopUpUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TopUpCreateOrConnectWithoutWalletInput | TopUpCreateOrConnectWithoutWalletInput[]
    createMany?: TopUpCreateManyWalletInputEnvelope
    connect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<PaymentCreateWithoutWalletInput, PaymentUncheckedCreateWithoutWalletInput> | PaymentCreateWithoutWalletInput[] | PaymentUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutWalletInput | PaymentCreateOrConnectWithoutWalletInput[]
    createMany?: PaymentCreateManyWalletInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCurrencyFieldUpdateOperationsInput = {
    set?: $Enums.Currency
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWalletsNestedInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    upsert?: UserUpsertWithoutWalletsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletsInput, UserUpdateWithoutWalletsInput>, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type TransactionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransferUpdateManyWithoutFromWalletNestedInput = {
    create?: XOR<TransferCreateWithoutFromWalletInput, TransferUncheckedCreateWithoutFromWalletInput> | TransferCreateWithoutFromWalletInput[] | TransferUncheckedCreateWithoutFromWalletInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromWalletInput | TransferCreateOrConnectWithoutFromWalletInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutFromWalletInput | TransferUpsertWithWhereUniqueWithoutFromWalletInput[]
    createMany?: TransferCreateManyFromWalletInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutFromWalletInput | TransferUpdateWithWhereUniqueWithoutFromWalletInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutFromWalletInput | TransferUpdateManyWithWhereWithoutFromWalletInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TransferUpdateManyWithoutToWalletNestedInput = {
    create?: XOR<TransferCreateWithoutToWalletInput, TransferUncheckedCreateWithoutToWalletInput> | TransferCreateWithoutToWalletInput[] | TransferUncheckedCreateWithoutToWalletInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToWalletInput | TransferCreateOrConnectWithoutToWalletInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutToWalletInput | TransferUpsertWithWhereUniqueWithoutToWalletInput[]
    createMany?: TransferCreateManyToWalletInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutToWalletInput | TransferUpdateWithWhereUniqueWithoutToWalletInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutToWalletInput | TransferUpdateManyWithWhereWithoutToWalletInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TopUpUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TopUpCreateWithoutWalletInput, TopUpUncheckedCreateWithoutWalletInput> | TopUpCreateWithoutWalletInput[] | TopUpUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TopUpCreateOrConnectWithoutWalletInput | TopUpCreateOrConnectWithoutWalletInput[]
    upsert?: TopUpUpsertWithWhereUniqueWithoutWalletInput | TopUpUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TopUpCreateManyWalletInputEnvelope
    set?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    disconnect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    delete?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    connect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    update?: TopUpUpdateWithWhereUniqueWithoutWalletInput | TopUpUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TopUpUpdateManyWithWhereWithoutWalletInput | TopUpUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TopUpScalarWhereInput | TopUpScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutWalletNestedInput = {
    create?: XOR<PaymentCreateWithoutWalletInput, PaymentUncheckedCreateWithoutWalletInput> | PaymentCreateWithoutWalletInput[] | PaymentUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutWalletInput | PaymentCreateOrConnectWithoutWalletInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutWalletInput | PaymentUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: PaymentCreateManyWalletInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutWalletInput | PaymentUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutWalletInput | PaymentUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransferUncheckedUpdateManyWithoutFromWalletNestedInput = {
    create?: XOR<TransferCreateWithoutFromWalletInput, TransferUncheckedCreateWithoutFromWalletInput> | TransferCreateWithoutFromWalletInput[] | TransferUncheckedCreateWithoutFromWalletInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromWalletInput | TransferCreateOrConnectWithoutFromWalletInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutFromWalletInput | TransferUpsertWithWhereUniqueWithoutFromWalletInput[]
    createMany?: TransferCreateManyFromWalletInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutFromWalletInput | TransferUpdateWithWhereUniqueWithoutFromWalletInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutFromWalletInput | TransferUpdateManyWithWhereWithoutFromWalletInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TransferUncheckedUpdateManyWithoutToWalletNestedInput = {
    create?: XOR<TransferCreateWithoutToWalletInput, TransferUncheckedCreateWithoutToWalletInput> | TransferCreateWithoutToWalletInput[] | TransferUncheckedCreateWithoutToWalletInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToWalletInput | TransferCreateOrConnectWithoutToWalletInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutToWalletInput | TransferUpsertWithWhereUniqueWithoutToWalletInput[]
    createMany?: TransferCreateManyToWalletInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutToWalletInput | TransferUpdateWithWhereUniqueWithoutToWalletInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutToWalletInput | TransferUpdateManyWithWhereWithoutToWalletInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TopUpUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TopUpCreateWithoutWalletInput, TopUpUncheckedCreateWithoutWalletInput> | TopUpCreateWithoutWalletInput[] | TopUpUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TopUpCreateOrConnectWithoutWalletInput | TopUpCreateOrConnectWithoutWalletInput[]
    upsert?: TopUpUpsertWithWhereUniqueWithoutWalletInput | TopUpUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TopUpCreateManyWalletInputEnvelope
    set?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    disconnect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    delete?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    connect?: TopUpWhereUniqueInput | TopUpWhereUniqueInput[]
    update?: TopUpUpdateWithWhereUniqueWithoutWalletInput | TopUpUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TopUpUpdateManyWithWhereWithoutWalletInput | TopUpUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TopUpScalarWhereInput | TopUpScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<PaymentCreateWithoutWalletInput, PaymentUncheckedCreateWithoutWalletInput> | PaymentCreateWithoutWalletInput[] | PaymentUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutWalletInput | PaymentCreateOrConnectWithoutWalletInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutWalletInput | PaymentUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: PaymentCreateManyWalletInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutWalletInput | PaymentUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutWalletInput | PaymentUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type WalletCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type EnumTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionStatus
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type WalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    upsert?: WalletUpsertWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTransactionsInput, WalletUpdateWithoutTransactionsInput>, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserCreateNestedOneWithoutTransfersSentInput = {
    create?: XOR<UserCreateWithoutTransfersSentInput, UserUncheckedCreateWithoutTransfersSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransfersSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTransfersRecvInput = {
    create?: XOR<UserCreateWithoutTransfersRecvInput, UserUncheckedCreateWithoutTransfersRecvInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransfersRecvInput
    connect?: UserWhereUniqueInput
  }

  export type WalletCreateNestedOneWithoutTransfersFromInput = {
    create?: XOR<WalletCreateWithoutTransfersFromInput, WalletUncheckedCreateWithoutTransfersFromInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransfersFromInput
    connect?: WalletWhereUniqueInput
  }

  export type WalletCreateNestedOneWithoutTransfersToInput = {
    create?: XOR<WalletCreateWithoutTransfersToInput, WalletUncheckedCreateWithoutTransfersToInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransfersToInput
    connect?: WalletWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTransfersSentNestedInput = {
    create?: XOR<UserCreateWithoutTransfersSentInput, UserUncheckedCreateWithoutTransfersSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransfersSentInput
    upsert?: UserUpsertWithoutTransfersSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransfersSentInput, UserUpdateWithoutTransfersSentInput>, UserUncheckedUpdateWithoutTransfersSentInput>
  }

  export type UserUpdateOneRequiredWithoutTransfersRecvNestedInput = {
    create?: XOR<UserCreateWithoutTransfersRecvInput, UserUncheckedCreateWithoutTransfersRecvInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransfersRecvInput
    upsert?: UserUpsertWithoutTransfersRecvInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransfersRecvInput, UserUpdateWithoutTransfersRecvInput>, UserUncheckedUpdateWithoutTransfersRecvInput>
  }

  export type WalletUpdateOneRequiredWithoutTransfersFromNestedInput = {
    create?: XOR<WalletCreateWithoutTransfersFromInput, WalletUncheckedCreateWithoutTransfersFromInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransfersFromInput
    upsert?: WalletUpsertWithoutTransfersFromInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTransfersFromInput, WalletUpdateWithoutTransfersFromInput>, WalletUncheckedUpdateWithoutTransfersFromInput>
  }

  export type WalletUpdateOneRequiredWithoutTransfersToNestedInput = {
    create?: XOR<WalletCreateWithoutTransfersToInput, WalletUncheckedCreateWithoutTransfersToInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransfersToInput
    upsert?: WalletUpsertWithoutTransfersToInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTransfersToInput, WalletUpdateWithoutTransfersToInput>, WalletUncheckedUpdateWithoutTransfersToInput>
  }

  export type UserCreateNestedOneWithoutTopUpsInput = {
    create?: XOR<UserCreateWithoutTopUpsInput, UserUncheckedCreateWithoutTopUpsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTopUpsInput
    connect?: UserWhereUniqueInput
  }

  export type WalletCreateNestedOneWithoutTopUpsInput = {
    create?: XOR<WalletCreateWithoutTopUpsInput, WalletUncheckedCreateWithoutTopUpsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTopUpsInput
    connect?: WalletWhereUniqueInput
  }

  export type EnumTopUpMethodFieldUpdateOperationsInput = {
    set?: $Enums.TopUpMethod
  }

  export type UserUpdateOneRequiredWithoutTopUpsNestedInput = {
    create?: XOR<UserCreateWithoutTopUpsInput, UserUncheckedCreateWithoutTopUpsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTopUpsInput
    upsert?: UserUpsertWithoutTopUpsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTopUpsInput, UserUpdateWithoutTopUpsInput>, UserUncheckedUpdateWithoutTopUpsInput>
  }

  export type WalletUpdateOneRequiredWithoutTopUpsNestedInput = {
    create?: XOR<WalletCreateWithoutTopUpsInput, WalletUncheckedCreateWithoutTopUpsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTopUpsInput
    upsert?: WalletUpsertWithoutTopUpsInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTopUpsInput, WalletUpdateWithoutTopUpsInput>, WalletUncheckedUpdateWithoutTopUpsInput>
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type WalletCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<WalletCreateWithoutPaymentsInput, WalletUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutPaymentsInput
    connect?: WalletWhereUniqueInput
  }

  export type EnumPaymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentType
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type WalletUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<WalletCreateWithoutPaymentsInput, WalletUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutPaymentsInput
    upsert?: WalletUpsertWithoutPaymentsInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutPaymentsInput, WalletUpdateWithoutPaymentsInput>, WalletUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type AdminCreatepermissionsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutAdminProfileInput = {
    create?: XOR<UserCreateWithoutAdminProfileInput, UserUncheckedCreateWithoutAdminProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminProfileInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAdminRoleFieldUpdateOperationsInput = {
    set?: $Enums.AdminRole
  }

  export type AdminUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutAdminProfileNestedInput = {
    create?: XOR<UserCreateWithoutAdminProfileInput, UserUncheckedCreateWithoutAdminProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminProfileInput
    upsert?: UserUpsertWithoutAdminProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminProfileInput, UserUpdateWithoutAdminProfileInput>, UserUncheckedUpdateWithoutAdminProfileInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | EnumCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Currency[] | ListEnumCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyFilter<$PrismaModel>
    _max?: NestedEnumCurrencyFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTopUpMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.TopUpMethod | EnumTopUpMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TopUpMethod[] | ListEnumTopUpMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.TopUpMethod[] | ListEnumTopUpMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumTopUpMethodFilter<$PrismaModel> | $Enums.TopUpMethod
  }

  export type NestedEnumTopUpMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TopUpMethod | EnumTopUpMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TopUpMethod[] | ListEnumTopUpMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.TopUpMethod[] | ListEnumTopUpMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumTopUpMethodWithAggregatesFilter<$PrismaModel> | $Enums.TopUpMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTopUpMethodFilter<$PrismaModel>
    _max?: NestedEnumTopUpMethodFilter<$PrismaModel>
  }

  export type NestedEnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedEnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole
  }

  export type NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WalletCreateWithoutUserInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferCreateNestedManyWithoutToWalletInput
    topUps?: TopUpCreateNestedManyWithoutWalletInput
    payments?: PaymentCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToWalletInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutWalletInput
    payments?: PaymentUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletCreateManyUserInputEnvelope = {
    data: WalletCreateManyUserInput | WalletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    walletId: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransferCreateWithoutFromUserInput = {
    id?: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    toUser: UserCreateNestedOneWithoutTransfersRecvInput
    fromWallet: WalletCreateNestedOneWithoutTransfersFromInput
    toWallet: WalletCreateNestedOneWithoutTransfersToInput
  }

  export type TransferUncheckedCreateWithoutFromUserInput = {
    id?: string
    toUserId: string
    fromWalletId: string
    toWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferCreateOrConnectWithoutFromUserInput = {
    where: TransferWhereUniqueInput
    create: XOR<TransferCreateWithoutFromUserInput, TransferUncheckedCreateWithoutFromUserInput>
  }

  export type TransferCreateManyFromUserInputEnvelope = {
    data: TransferCreateManyFromUserInput | TransferCreateManyFromUserInput[]
    skipDuplicates?: boolean
  }

  export type TransferCreateWithoutToUserInput = {
    id?: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutTransfersSentInput
    fromWallet: WalletCreateNestedOneWithoutTransfersFromInput
    toWallet: WalletCreateNestedOneWithoutTransfersToInput
  }

  export type TransferUncheckedCreateWithoutToUserInput = {
    id?: string
    fromUserId: string
    fromWalletId: string
    toWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferCreateOrConnectWithoutToUserInput = {
    where: TransferWhereUniqueInput
    create: XOR<TransferCreateWithoutToUserInput, TransferUncheckedCreateWithoutToUserInput>
  }

  export type TransferCreateManyToUserInputEnvelope = {
    data: TransferCreateManyToUserInput | TransferCreateManyToUserInput[]
    skipDuplicates?: boolean
  }

  export type TopUpCreateWithoutUserInput = {
    id?: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTopUpsInput
  }

  export type TopUpUncheckedCreateWithoutUserInput = {
    id?: string
    walletId: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TopUpCreateOrConnectWithoutUserInput = {
    where: TopUpWhereUniqueInput
    create: XOR<TopUpCreateWithoutUserInput, TopUpUncheckedCreateWithoutUserInput>
  }

  export type TopUpCreateManyUserInputEnvelope = {
    data: TopUpCreateManyUserInput | TopUpCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutUserInput = {
    id?: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet: WalletCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: string
    walletId: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    readAt?: Date | string | null
    link?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    readAt?: Date | string | null
    link?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AdminCreateWithoutUserInput = {
    id?: string
    role: $Enums.AdminRole
    permissions?: AdminCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AdminUncheckedCreateWithoutUserInput = {
    id?: string
    role: $Enums.AdminRole
    permissions?: AdminCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AdminCreateOrConnectWithoutUserInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
  }

  export type UserSessionCreateWithoutUserInput = {
    id?: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionCreateOrConnectWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionCreateManyUserInputEnvelope = {
    data: UserSessionCreateManyUserInput | UserSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WalletUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateManyWithWhereWithoutUserInput = {
    where: WalletScalarWhereInput
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletScalarWhereInput = {
    AND?: WalletScalarWhereInput | WalletScalarWhereInput[]
    OR?: WalletScalarWhereInput[]
    NOT?: WalletScalarWhereInput | WalletScalarWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringFilter<"Wallet"> | string
    balance?: IntFilter<"Wallet"> | number
    currency?: EnumCurrencyFilter<"Wallet"> | $Enums.Currency
    accountNumber?: StringFilter<"Wallet"> | string
    isActive?: BoolFilter<"Wallet"> | boolean
    dailyLimit?: IntNullableFilter<"Wallet"> | number | null
    monthlyLimit?: IntNullableFilter<"Wallet"> | number | null
    currentDailyUsage?: IntNullableFilter<"Wallet"> | number | null
    currentMonthlyUsage?: IntNullableFilter<"Wallet"> | number | null
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    fromWalletId?: StringNullableFilter<"Transaction"> | string | null
    toWalletId?: StringNullableFilter<"Transaction"> | string | null
    referenceCode?: StringNullableFilter<"Transaction"> | string | null
    failureReason?: StringNullableFilter<"Transaction"> | string | null
    recipientName?: StringNullableFilter<"Transaction"> | string | null
    senderName?: StringNullableFilter<"Transaction"> | string | null
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    amount?: IntFilter<"Transaction"> | number
    fee?: IntNullableFilter<"Transaction"> | number | null
    currency?: EnumCurrencyFilter<"Transaction"> | $Enums.Currency
    referenceId?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    completedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type TransferUpsertWithWhereUniqueWithoutFromUserInput = {
    where: TransferWhereUniqueInput
    update: XOR<TransferUpdateWithoutFromUserInput, TransferUncheckedUpdateWithoutFromUserInput>
    create: XOR<TransferCreateWithoutFromUserInput, TransferUncheckedCreateWithoutFromUserInput>
  }

  export type TransferUpdateWithWhereUniqueWithoutFromUserInput = {
    where: TransferWhereUniqueInput
    data: XOR<TransferUpdateWithoutFromUserInput, TransferUncheckedUpdateWithoutFromUserInput>
  }

  export type TransferUpdateManyWithWhereWithoutFromUserInput = {
    where: TransferScalarWhereInput
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyWithoutFromUserInput>
  }

  export type TransferScalarWhereInput = {
    AND?: TransferScalarWhereInput | TransferScalarWhereInput[]
    OR?: TransferScalarWhereInput[]
    NOT?: TransferScalarWhereInput | TransferScalarWhereInput[]
    id?: StringFilter<"Transfer"> | string
    fromUserId?: StringFilter<"Transfer"> | string
    toUserId?: StringFilter<"Transfer"> | string
    fromWalletId?: StringFilter<"Transfer"> | string
    toWalletId?: StringFilter<"Transfer"> | string
    amount?: IntFilter<"Transfer"> | number
    fee?: IntNullableFilter<"Transfer"> | number | null
    status?: EnumTransactionStatusFilter<"Transfer"> | $Enums.TransactionStatus
    reference?: StringNullableFilter<"Transfer"> | string | null
    transactionId?: StringFilter<"Transfer"> | string
    counterpartTransactionId?: StringFilter<"Transfer"> | string
    completedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    createdAt?: DateTimeFilter<"Transfer"> | Date | string
    updatedAt?: DateTimeFilter<"Transfer"> | Date | string
  }

  export type TransferUpsertWithWhereUniqueWithoutToUserInput = {
    where: TransferWhereUniqueInput
    update: XOR<TransferUpdateWithoutToUserInput, TransferUncheckedUpdateWithoutToUserInput>
    create: XOR<TransferCreateWithoutToUserInput, TransferUncheckedCreateWithoutToUserInput>
  }

  export type TransferUpdateWithWhereUniqueWithoutToUserInput = {
    where: TransferWhereUniqueInput
    data: XOR<TransferUpdateWithoutToUserInput, TransferUncheckedUpdateWithoutToUserInput>
  }

  export type TransferUpdateManyWithWhereWithoutToUserInput = {
    where: TransferScalarWhereInput
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyWithoutToUserInput>
  }

  export type TopUpUpsertWithWhereUniqueWithoutUserInput = {
    where: TopUpWhereUniqueInput
    update: XOR<TopUpUpdateWithoutUserInput, TopUpUncheckedUpdateWithoutUserInput>
    create: XOR<TopUpCreateWithoutUserInput, TopUpUncheckedCreateWithoutUserInput>
  }

  export type TopUpUpdateWithWhereUniqueWithoutUserInput = {
    where: TopUpWhereUniqueInput
    data: XOR<TopUpUpdateWithoutUserInput, TopUpUncheckedUpdateWithoutUserInput>
  }

  export type TopUpUpdateManyWithWhereWithoutUserInput = {
    where: TopUpScalarWhereInput
    data: XOR<TopUpUpdateManyMutationInput, TopUpUncheckedUpdateManyWithoutUserInput>
  }

  export type TopUpScalarWhereInput = {
    AND?: TopUpScalarWhereInput | TopUpScalarWhereInput[]
    OR?: TopUpScalarWhereInput[]
    NOT?: TopUpScalarWhereInput | TopUpScalarWhereInput[]
    id?: StringFilter<"TopUp"> | string
    userId?: StringFilter<"TopUp"> | string
    walletId?: StringFilter<"TopUp"> | string
    amount?: IntFilter<"TopUp"> | number
    method?: EnumTopUpMethodFilter<"TopUp"> | $Enums.TopUpMethod
    status?: EnumTransactionStatusFilter<"TopUp"> | $Enums.TransactionStatus
    externalReference?: StringNullableFilter<"TopUp"> | string | null
    transactionId?: StringFilter<"TopUp"> | string
    completedAt?: DateTimeNullableFilter<"TopUp"> | Date | string | null
    createdAt?: DateTimeFilter<"TopUp"> | Date | string
    updatedAt?: DateTimeFilter<"TopUp"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    walletId?: StringFilter<"Payment"> | string
    amount?: IntFilter<"Payment"> | number
    fee?: IntNullableFilter<"Payment"> | number | null
    type?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    merchantId?: StringNullableFilter<"Payment"> | string | null
    billCode?: StringNullableFilter<"Payment"> | string | null
    description?: StringNullableFilter<"Payment"> | string | null
    status?: EnumTransactionStatusFilter<"Payment"> | $Enums.TransactionStatus
    transactionId?: StringFilter<"Payment"> | string
    completedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    isRead?: BoolFilter<"Notification"> | boolean
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    link?: StringNullableFilter<"Notification"> | string | null
    metadata?: JsonNullableFilter<"Notification">
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type AdminUpsertWithoutUserInput = {
    update: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    update: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    data: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateManyWithWhereWithoutUserInput = {
    where: UserSessionScalarWhereInput
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSessionScalarWhereInput = {
    AND?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    OR?: UserSessionScalarWhereInput[]
    NOT?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    id?: StringFilter<"UserSession"> | string
    userId?: StringFilter<"UserSession"> | string
    token?: StringFilter<"UserSession"> | string
    deviceInfo?: StringNullableFilter<"UserSession"> | string | null
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    isRevoked?: BoolFilter<"UserSession"> | boolean
    revokedAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
  }

  export type UserCreateWithoutWalletsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
  }

  export type TransactionCreateWithoutWalletInput = {
    id?: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutWalletInput = {
    id?: string
    userId: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateManyWalletInputEnvelope = {
    data: TransactionCreateManyWalletInput | TransactionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type TransferCreateWithoutFromWalletInput = {
    id?: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutTransfersSentInput
    toUser: UserCreateNestedOneWithoutTransfersRecvInput
    toWallet: WalletCreateNestedOneWithoutTransfersToInput
  }

  export type TransferUncheckedCreateWithoutFromWalletInput = {
    id?: string
    fromUserId: string
    toUserId: string
    toWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferCreateOrConnectWithoutFromWalletInput = {
    where: TransferWhereUniqueInput
    create: XOR<TransferCreateWithoutFromWalletInput, TransferUncheckedCreateWithoutFromWalletInput>
  }

  export type TransferCreateManyFromWalletInputEnvelope = {
    data: TransferCreateManyFromWalletInput | TransferCreateManyFromWalletInput[]
    skipDuplicates?: boolean
  }

  export type TransferCreateWithoutToWalletInput = {
    id?: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutTransfersSentInput
    toUser: UserCreateNestedOneWithoutTransfersRecvInput
    fromWallet: WalletCreateNestedOneWithoutTransfersFromInput
  }

  export type TransferUncheckedCreateWithoutToWalletInput = {
    id?: string
    fromUserId: string
    toUserId: string
    fromWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferCreateOrConnectWithoutToWalletInput = {
    where: TransferWhereUniqueInput
    create: XOR<TransferCreateWithoutToWalletInput, TransferUncheckedCreateWithoutToWalletInput>
  }

  export type TransferCreateManyToWalletInputEnvelope = {
    data: TransferCreateManyToWalletInput | TransferCreateManyToWalletInput[]
    skipDuplicates?: boolean
  }

  export type TopUpCreateWithoutWalletInput = {
    id?: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTopUpsInput
  }

  export type TopUpUncheckedCreateWithoutWalletInput = {
    id?: string
    userId: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TopUpCreateOrConnectWithoutWalletInput = {
    where: TopUpWhereUniqueInput
    create: XOR<TopUpCreateWithoutWalletInput, TopUpUncheckedCreateWithoutWalletInput>
  }

  export type TopUpCreateManyWalletInputEnvelope = {
    data: TopUpCreateManyWalletInput | TopUpCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutWalletInput = {
    id?: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutWalletInput = {
    id?: string
    userId: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutWalletInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutWalletInput, PaymentUncheckedCreateWithoutWalletInput>
  }

  export type PaymentCreateManyWalletInputEnvelope = {
    data: PaymentCreateManyWalletInput | PaymentCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWalletsInput = {
    update: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type UserUpdateWithoutWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithWhereWithoutWalletInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutWalletInput>
  }

  export type TransferUpsertWithWhereUniqueWithoutFromWalletInput = {
    where: TransferWhereUniqueInput
    update: XOR<TransferUpdateWithoutFromWalletInput, TransferUncheckedUpdateWithoutFromWalletInput>
    create: XOR<TransferCreateWithoutFromWalletInput, TransferUncheckedCreateWithoutFromWalletInput>
  }

  export type TransferUpdateWithWhereUniqueWithoutFromWalletInput = {
    where: TransferWhereUniqueInput
    data: XOR<TransferUpdateWithoutFromWalletInput, TransferUncheckedUpdateWithoutFromWalletInput>
  }

  export type TransferUpdateManyWithWhereWithoutFromWalletInput = {
    where: TransferScalarWhereInput
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyWithoutFromWalletInput>
  }

  export type TransferUpsertWithWhereUniqueWithoutToWalletInput = {
    where: TransferWhereUniqueInput
    update: XOR<TransferUpdateWithoutToWalletInput, TransferUncheckedUpdateWithoutToWalletInput>
    create: XOR<TransferCreateWithoutToWalletInput, TransferUncheckedCreateWithoutToWalletInput>
  }

  export type TransferUpdateWithWhereUniqueWithoutToWalletInput = {
    where: TransferWhereUniqueInput
    data: XOR<TransferUpdateWithoutToWalletInput, TransferUncheckedUpdateWithoutToWalletInput>
  }

  export type TransferUpdateManyWithWhereWithoutToWalletInput = {
    where: TransferScalarWhereInput
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyWithoutToWalletInput>
  }

  export type TopUpUpsertWithWhereUniqueWithoutWalletInput = {
    where: TopUpWhereUniqueInput
    update: XOR<TopUpUpdateWithoutWalletInput, TopUpUncheckedUpdateWithoutWalletInput>
    create: XOR<TopUpCreateWithoutWalletInput, TopUpUncheckedCreateWithoutWalletInput>
  }

  export type TopUpUpdateWithWhereUniqueWithoutWalletInput = {
    where: TopUpWhereUniqueInput
    data: XOR<TopUpUpdateWithoutWalletInput, TopUpUncheckedUpdateWithoutWalletInput>
  }

  export type TopUpUpdateManyWithWhereWithoutWalletInput = {
    where: TopUpScalarWhereInput
    data: XOR<TopUpUpdateManyMutationInput, TopUpUncheckedUpdateManyWithoutWalletInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutWalletInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutWalletInput, PaymentUncheckedUpdateWithoutWalletInput>
    create: XOR<PaymentCreateWithoutWalletInput, PaymentUncheckedCreateWithoutWalletInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutWalletInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutWalletInput, PaymentUncheckedUpdateWithoutWalletInput>
  }

  export type PaymentUpdateManyWithWhereWithoutWalletInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutWalletInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type WalletCreateWithoutTransactionsInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
    transfersFrom?: TransferCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferCreateNestedManyWithoutToWalletInput
    topUps?: TopUpCreateNestedManyWithoutWalletInput
    payments?: PaymentCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToWalletInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutWalletInput
    payments?: PaymentUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutTransactionsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WalletUpsertWithoutTransactionsInput = {
    update: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type WalletUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUpdateManyWithoutWalletNestedInput
    payments?: PaymentUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutWalletNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserCreateWithoutTransfersSentInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransfersSentInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransfersSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransfersSentInput, UserUncheckedCreateWithoutTransfersSentInput>
  }

  export type UserCreateWithoutTransfersRecvInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransfersRecvInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransfersRecvInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransfersRecvInput, UserUncheckedCreateWithoutTransfersRecvInput>
  }

  export type WalletCreateWithoutTransfersFromInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    transfersTo?: TransferCreateNestedManyWithoutToWalletInput
    topUps?: TopUpCreateNestedManyWithoutWalletInput
    payments?: PaymentCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutTransfersFromInput = {
    id?: string
    userId: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToWalletInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutWalletInput
    payments?: PaymentUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutTransfersFromInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTransfersFromInput, WalletUncheckedCreateWithoutTransfersFromInput>
  }

  export type WalletCreateWithoutTransfersToInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferCreateNestedManyWithoutFromWalletInput
    topUps?: TopUpCreateNestedManyWithoutWalletInput
    payments?: PaymentCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutTransfersToInput = {
    id?: string
    userId: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromWalletInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutWalletInput
    payments?: PaymentUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutTransfersToInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTransfersToInput, WalletUncheckedCreateWithoutTransfersToInput>
  }

  export type UserUpsertWithoutTransfersSentInput = {
    update: XOR<UserUpdateWithoutTransfersSentInput, UserUncheckedUpdateWithoutTransfersSentInput>
    create: XOR<UserCreateWithoutTransfersSentInput, UserUncheckedCreateWithoutTransfersSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransfersSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransfersSentInput, UserUncheckedUpdateWithoutTransfersSentInput>
  }

  export type UserUpdateWithoutTransfersSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransfersSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutTransfersRecvInput = {
    update: XOR<UserUpdateWithoutTransfersRecvInput, UserUncheckedUpdateWithoutTransfersRecvInput>
    create: XOR<UserCreateWithoutTransfersRecvInput, UserUncheckedCreateWithoutTransfersRecvInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransfersRecvInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransfersRecvInput, UserUncheckedUpdateWithoutTransfersRecvInput>
  }

  export type UserUpdateWithoutTransfersRecvInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransfersRecvInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WalletUpsertWithoutTransfersFromInput = {
    update: XOR<WalletUpdateWithoutTransfersFromInput, WalletUncheckedUpdateWithoutTransfersFromInput>
    create: XOR<WalletCreateWithoutTransfersFromInput, WalletUncheckedCreateWithoutTransfersFromInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTransfersFromInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTransfersFromInput, WalletUncheckedUpdateWithoutTransfersFromInput>
  }

  export type WalletUpdateWithoutTransfersFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    transfersTo?: TransferUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUpdateManyWithoutWalletNestedInput
    payments?: PaymentUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutTransfersFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutWalletNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletUpsertWithoutTransfersToInput = {
    update: XOR<WalletUpdateWithoutTransfersToInput, WalletUncheckedUpdateWithoutTransfersToInput>
    create: XOR<WalletCreateWithoutTransfersToInput, WalletUncheckedCreateWithoutTransfersToInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTransfersToInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTransfersToInput, WalletUncheckedUpdateWithoutTransfersToInput>
  }

  export type WalletUpdateWithoutTransfersToInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromWalletNestedInput
    topUps?: TopUpUpdateManyWithoutWalletNestedInput
    payments?: PaymentUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutTransfersToInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromWalletNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutWalletNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserCreateWithoutTopUpsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTopUpsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTopUpsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTopUpsInput, UserUncheckedCreateWithoutTopUpsInput>
  }

  export type WalletCreateWithoutTopUpsInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferCreateNestedManyWithoutToWalletInput
    payments?: PaymentCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutTopUpsInput = {
    id?: string
    userId: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToWalletInput
    payments?: PaymentUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutTopUpsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTopUpsInput, WalletUncheckedCreateWithoutTopUpsInput>
  }

  export type UserUpsertWithoutTopUpsInput = {
    update: XOR<UserUpdateWithoutTopUpsInput, UserUncheckedUpdateWithoutTopUpsInput>
    create: XOR<UserCreateWithoutTopUpsInput, UserUncheckedCreateWithoutTopUpsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTopUpsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTopUpsInput, UserUncheckedUpdateWithoutTopUpsInput>
  }

  export type UserUpdateWithoutTopUpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTopUpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WalletUpsertWithoutTopUpsInput = {
    update: XOR<WalletUpdateWithoutTopUpsInput, WalletUncheckedUpdateWithoutTopUpsInput>
    create: XOR<WalletCreateWithoutTopUpsInput, WalletUncheckedCreateWithoutTopUpsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTopUpsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTopUpsInput, WalletUncheckedUpdateWithoutTopUpsInput>
  }

  export type WalletUpdateWithoutTopUpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUpdateManyWithoutToWalletNestedInput
    payments?: PaymentUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutTopUpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToWalletNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserCreateWithoutPaymentsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type WalletCreateWithoutPaymentsInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferCreateNestedManyWithoutToWalletInput
    topUps?: TopUpCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutPaymentsInput = {
    id?: string
    userId: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromWalletInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToWalletInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutPaymentsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutPaymentsInput, WalletUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WalletUpsertWithoutPaymentsInput = {
    update: XOR<WalletUpdateWithoutPaymentsInput, WalletUncheckedUpdateWithoutPaymentsInput>
    create: XOR<WalletCreateWithoutPaymentsInput, WalletUncheckedCreateWithoutPaymentsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutPaymentsInput, WalletUncheckedUpdateWithoutPaymentsInput>
  }

  export type WalletUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAdminProfileInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminProfileInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminProfileInput, UserUncheckedCreateWithoutAdminProfileInput>
  }

  export type UserUpsertWithoutAdminProfileInput = {
    update: XOR<UserUpdateWithoutAdminProfileInput, UserUncheckedUpdateWithoutAdminProfileInput>
    create: XOR<UserCreateWithoutAdminProfileInput, UserUncheckedCreateWithoutAdminProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminProfileInput, UserUncheckedUpdateWithoutAdminProfileInput>
  }

  export type UserUpdateWithoutAdminProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    transfersSent?: TransferCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferCreateNestedManyWithoutToUserInput
    topUps?: TopUpCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    adminProfile?: AdminCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    phoneNumber?: string | null
    name: string
    avatar?: string | null
    role?: $Enums.UserRole
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    lastLoginAt?: Date | string | null
    twoFactorEnabled?: boolean | null
    twoFactorSecret?: string | null
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    transfersSent?: TransferUncheckedCreateNestedManyWithoutFromUserInput
    transfersRecv?: TransferUncheckedCreateNestedManyWithoutToUserInput
    topUps?: TopUpUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    adminProfile?: AdminUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    transfersSent?: TransferUncheckedUpdateManyWithoutFromUserNestedInput
    transfersRecv?: TransferUncheckedUpdateManyWithoutToUserNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    adminProfile?: AdminUncheckedUpdateOneWithoutUserNestedInput
  }

  export type WalletCreateManyUserInput = {
    id?: string
    balance?: number
    currency?: $Enums.Currency
    accountNumber: string
    isActive?: boolean
    dailyLimit?: number | null
    monthlyLimit?: number | null
    currentDailyUsage?: number | null
    currentMonthlyUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    walletId: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferCreateManyFromUserInput = {
    id?: string
    toUserId: string
    fromWalletId: string
    toWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferCreateManyToUserInput = {
    id?: string
    fromUserId: string
    fromWalletId: string
    toWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TopUpCreateManyUserInput = {
    id?: string
    walletId: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyUserInput = {
    id?: string
    walletId: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    type: $Enums.NotificationType
    isRead?: boolean
    readAt?: Date | string | null
    link?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSessionCreateManyUserInput = {
    id?: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUpdateManyWithoutWalletNestedInput
    payments?: PaymentUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromWalletNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToWalletNestedInput
    topUps?: TopUpUncheckedUpdateManyWithoutWalletNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    accountNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dailyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    currentDailyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    currentMonthlyUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toUser?: UserUpdateOneRequiredWithoutTransfersRecvNestedInput
    fromWallet?: WalletUpdateOneRequiredWithoutTransfersFromNestedInput
    toWallet?: WalletUpdateOneRequiredWithoutTransfersToNestedInput
  }

  export type TransferUncheckedUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: StringFieldUpdateOperationsInput | string
    toWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUncheckedUpdateManyWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: StringFieldUpdateOperationsInput | string
    toWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutTransfersSentNestedInput
    fromWallet?: WalletUpdateOneRequiredWithoutTransfersFromNestedInput
    toWallet?: WalletUpdateOneRequiredWithoutTransfersToNestedInput
  }

  export type TransferUncheckedUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: StringFieldUpdateOperationsInput | string
    toWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUncheckedUpdateManyWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: StringFieldUpdateOperationsInput | string
    toWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopUpUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTopUpsNestedInput
  }

  export type TopUpUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopUpUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    isRead?: BoolFieldUpdateOperationsInput | boolean
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyWalletInput = {
    id?: string
    userId: string
    fromWalletId?: string | null
    toWalletId?: string | null
    referenceCode?: string | null
    failureReason?: string | null
    recipientName?: string | null
    senderName?: string | null
    type: $Enums.TransactionType
    status?: $Enums.TransactionStatus
    amount: number
    fee?: number | null
    currency?: $Enums.Currency
    referenceId?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferCreateManyFromWalletInput = {
    id?: string
    fromUserId: string
    toUserId: string
    toWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferCreateManyToWalletInput = {
    id?: string
    fromUserId: string
    toUserId: string
    fromWalletId: string
    amount: number
    fee?: number | null
    status?: $Enums.TransactionStatus
    reference?: string | null
    transactionId: string
    counterpartTransactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TopUpCreateManyWalletInput = {
    id?: string
    userId: string
    amount: number
    method: $Enums.TopUpMethod
    status?: $Enums.TransactionStatus
    externalReference?: string | null
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyWalletInput = {
    id?: string
    userId: string
    amount: number
    fee?: number | null
    type: $Enums.PaymentType
    merchantId?: string | null
    billCode?: string | null
    description?: string | null
    status?: $Enums.TransactionStatus
    transactionId: string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    toWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    referenceCode?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    recipientName?: NullableStringFieldUpdateOperationsInput | string | null
    senderName?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    currency?: EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUpdateWithoutFromWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutTransfersSentNestedInput
    toUser?: UserUpdateOneRequiredWithoutTransfersRecvNestedInput
    toWallet?: WalletUpdateOneRequiredWithoutTransfersToNestedInput
  }

  export type TransferUncheckedUpdateWithoutFromWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    toWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUncheckedUpdateManyWithoutFromWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    toWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUpdateWithoutToWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutTransfersSentNestedInput
    toUser?: UserUpdateOneRequiredWithoutTransfersRecvNestedInput
    fromWallet?: WalletUpdateOneRequiredWithoutTransfersFromNestedInput
  }

  export type TransferUncheckedUpdateWithoutToWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferUncheckedUpdateManyWithoutToWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    fromWalletId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    counterpartTransactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopUpUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTopUpsNestedInput
  }

  export type TopUpUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TopUpUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumTopUpMethodFieldUpdateOperationsInput | $Enums.TopUpMethod
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    fee?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    merchantId?: NullableStringFieldUpdateOperationsInput | string | null
    billCode?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}