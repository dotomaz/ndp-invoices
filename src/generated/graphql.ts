export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-01-01 13:00:00`. */
  DateTime: any;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  invoice_periods?: Maybe<InvoicePeriodPaginator>;
  invoice_period?: Maybe<InvoicePeriod>;
  invoices?: Maybe<InvoicePaginator>;
  invoices_per_period?: Maybe<InvoicePaginator>;
  invoice?: Maybe<Invoice>;
};


export type QueryInvoice_PeriodsArgs = {
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
};


export type QueryInvoice_PeriodArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryInvoicesArgs = {
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
};


export type QueryInvoices_Per_PeriodArgs = {
  period_id?: Maybe<Scalars['Int']>;
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
};


export type QueryInvoiceArgs = {
  id?: Maybe<Scalars['ID']>;
};

/** A paginated list of InvoicePeriod items. */
export type InvoicePeriodPaginator = {
  __typename?: 'InvoicePeriodPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of InvoicePeriod items. */
  data: Array<InvoicePeriod>;
};

/** Pagination information about the corresponding list of items. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Total count of available items in the page. */
  count: Scalars['Int'];
  /** Current pagination page. */
  currentPage: Scalars['Int'];
  /** Index of first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** If collection has more pages. */
  hasMorePages: Scalars['Boolean'];
  /** Index of last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Last page number of the collection. */
  lastPage: Scalars['Int'];
  /** Number of items per page in the collection. */
  perPage: Scalars['Int'];
  /** Total items available in the collection. */
  total: Scalars['Int'];
};

export type InvoicePeriod = {
  __typename?: 'InvoicePeriod';
  id: Scalars['ID'];
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

/** A paginated list of Invoice items. */
export type InvoicePaginator = {
  __typename?: 'InvoicePaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Invoice items. */
  data: Array<Invoice>;
};

export type Invoice = {
  __typename?: 'Invoice';
  id: Scalars['ID'];
  period_id?: Maybe<Scalars['Int']>;
  period?: Maybe<InvoicePeriod>;
  parent_name?: Maybe<Scalars['String']>;
  child_name?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  reference?: Maybe<Scalars['String']>;
  should_send?: Maybe<Scalars['Int']>;
  sent?: Maybe<Scalars['Int']>;
  sent_date?: Maybe<Scalars['DateTime']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createInvoicePeriod?: Maybe<InvoicePeriod>;
  updateInvoicePeriod?: Maybe<InvoicePeriod>;
  deleteInvoicePeriod?: Maybe<InvoicePeriod>;
  createInvoice?: Maybe<Invoice>;
  updateInvoice?: Maybe<Invoice>;
  deleteInvoice?: Maybe<Invoice>;
  sendEmailToInvoice?: Maybe<Response>;
  sendEmailsToInvoicePeriod?: Maybe<Response>;
};


export type MutationCreateInvoicePeriodArgs = {
  input: InvoicePeriodInput;
};


export type MutationUpdateInvoicePeriodArgs = {
  id: Scalars['ID'];
  input: InvoicePeriodInput;
};


export type MutationDeleteInvoicePeriodArgs = {
  id: Scalars['ID'];
};


export type MutationCreateInvoiceArgs = {
  input: InvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  id: Scalars['ID'];
  input: InvoiceInput;
};


export type MutationDeleteInvoiceArgs = {
  id: Scalars['ID'];
};


export type MutationSendEmailToInvoiceArgs = {
  id: Scalars['ID'];
};


export type MutationSendEmailsToInvoicePeriodArgs = {
  id: Scalars['ID'];
};

export type InvoicePeriodInput = {
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type InvoiceInput = {
  period_id?: Maybe<Scalars['Int']>;
  parent_name?: Maybe<Scalars['String']>;
  child_name?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  reference?: Maybe<Scalars['String']>;
  should_send?: Maybe<Scalars['Int']>;
  sent?: Maybe<Scalars['Int']>;
  sent_date?: Maybe<Scalars['DateTime']>;
};

export type Response = {
  __typename?: 'Response';
  success: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
};


/** Pagination information about the corresponding list of items. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Total number of node in connection. */
  total?: Maybe<Scalars['Int']>;
  /** Count of nodes in current request. */
  count?: Maybe<Scalars['Int']>;
  /** Current page of request. */
  currentPage?: Maybe<Scalars['Int']>;
  /** Last page in connection. */
  lastPage?: Maybe<Scalars['Int']>;
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  field: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type CreateInvoiceMutationVariables = Exact<{
  input: InvoiceInput;
}>;


export type CreateInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { createInvoice?: Maybe<(
    { __typename?: 'Invoice' }
    & Pick<Invoice, 'id'>
  )> }
);

export type CreateInvoicePeriodMutationVariables = Exact<{
  input: InvoicePeriodInput;
}>;


export type CreateInvoicePeriodMutation = (
  { __typename?: 'Mutation' }
  & { createInvoicePeriod?: Maybe<(
    { __typename?: 'InvoicePeriod' }
    & Pick<InvoicePeriod, 'id'>
  )> }
);

export type DeleteInvoiceMutationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteInvoiceMutationMutation = (
  { __typename?: 'Mutation' }
  & { deleteInvoice?: Maybe<(
    { __typename?: 'Invoice' }
    & Pick<Invoice, 'id'>
  )> }
);

export type DeleteInvoicePeriodMutationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteInvoicePeriodMutationMutation = (
  { __typename?: 'Mutation' }
  & { deleteInvoicePeriod?: Maybe<(
    { __typename?: 'InvoicePeriod' }
    & Pick<InvoicePeriod, 'id'>
  )> }
);

export type GetInvoicePeriodsQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type GetInvoicePeriodsQuery = (
  { __typename?: 'Query' }
  & { invoice_periods?: Maybe<(
    { __typename?: 'InvoicePeriodPaginator' }
    & { data: Array<(
      { __typename?: 'InvoicePeriod' }
      & Pick<InvoicePeriod, 'id' | 'month' | 'year'>
    )> }
  )> }
);

export type GetInvoicesQueryVariables = Exact<{
  periodId: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetInvoicesQuery = (
  { __typename?: 'Query' }
  & { invoices_per_period?: Maybe<(
    { __typename?: 'InvoicePaginator' }
    & { data: Array<(
      { __typename?: 'Invoice' }
      & Pick<Invoice, 'id' | 'parent_name' | 'child_name' | 'team' | 'email' | 'address' | 'city' | 'price' | 'discount' | 'reference' | 'sent' | 'sent_date'>
      & { period?: Maybe<(
        { __typename?: 'InvoicePeriod' }
        & Pick<InvoicePeriod, 'id' | 'month' | 'year'>
      )> }
    )> }
  )> }
);

export type InitQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type InitQuery = (
  { __typename?: 'Query' }
  & { invoice_periods?: Maybe<(
    { __typename?: 'InvoicePeriodPaginator' }
    & { data: Array<(
      { __typename?: 'InvoicePeriod' }
      & Pick<InvoicePeriod, 'id' | 'month' | 'year'>
    )> }
  )> }
);

export type LoadInvoiceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LoadInvoiceQuery = (
  { __typename?: 'Query' }
  & { invoice?: Maybe<(
    { __typename?: 'Invoice' }
    & Pick<Invoice, 'id' | 'parent_name' | 'child_name' | 'team' | 'email' | 'address' | 'city' | 'price' | 'discount' | 'reference' | 'sent' | 'sent_date'>
    & { period?: Maybe<(
      { __typename?: 'InvoicePeriod' }
      & Pick<InvoicePeriod, 'id' | 'month' | 'year'>
    )> }
  )> }
);

export type SendEmailsToInvoicePeriodMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SendEmailsToInvoicePeriodMutation = (
  { __typename?: 'Mutation' }
  & { sendEmailsToInvoicePeriod?: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'success' | 'message'>
  )> }
);

export type SendEmailToInvoiceMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SendEmailToInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { sendEmailToInvoice?: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'success' | 'message'>
  )> }
);

export type UpdateInvoiceMutationVariables = Exact<{
  id: Scalars['ID'];
  input: InvoiceInput;
}>;


export type UpdateInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { updateInvoice?: Maybe<(
    { __typename?: 'Invoice' }
    & Pick<Invoice, 'id'>
  )> }
);

export type UpdateInvoicePeriodMutationMutationVariables = Exact<{
  id: Scalars['ID'];
  input: InvoicePeriodInput;
}>;


export type UpdateInvoicePeriodMutationMutation = (
  { __typename?: 'Mutation' }
  & { updateInvoicePeriod?: Maybe<(
    { __typename?: 'InvoicePeriod' }
    & Pick<InvoicePeriod, 'id'>
  )> }
);
