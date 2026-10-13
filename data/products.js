/* Public catalog. Run `node scripts/build-pages.cjs` after editing.
 * Only availability: 'available' + every verification flag enables checkout.
 * Never store source archives, credentials, or customer data here.
 */
(function (root, factory) {
  const catalog = factory();
  if (typeof module === 'object' && module.exports) module.exports = catalog;
  else root.DEVKIT_PRODUCTS = catalog;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const products = [
    {
      slug: 'releasekit', name: 'ReleaseKit', category: 'tools', price: 29,
      summary: 'Build, check, and publish Python and npm packages',
      headline: 'Ship the package you actually tested',
      description: 'Catch missing files, broken exports, and installation failures before your users do — with local package checks and approval-gated release workflows',
      tags: ['Python', 'npm', 'GitHub Actions'], availability: 'preview',
      checkoutUrl: 'https://devkitclub.lemonsqueezy.com/checkout/buy/1e702926-1443-480c-a713-0b3f7e3efd23',
      deliveryVerified: false, termsApproved: false, priceConfirmed: false,
      edition: 'v1.0.1 preview', icon: 'package', stamp: 'DIST / 001',
      artifact: 'release-manifest.json', stages: ['Build', 'Install', 'Verify', 'Approve'],
      demo: ['wheel + sdist → clean environment', 'npm tarball → clean consumer', 'artifact hashes → release approval'],
      features: [
        ['Check the delivered files', 'Build real distributions and test the installed public API outside your checkout, including a wheel rebuilt from the source archive'],
        ['Catch broken npm exports', 'Inspect tarballs, exported files, and type declarations, then install into a clean consumer with lifecycle scripts disabled'],
        ['Keep publishing deliberate', 'Use reviewed versions, changelogs, artifact hashes, and approval gates; local commands do not publish']
      ],
      contents: [
        ['python/ + javascript/', 'Reference packages and customer CI/release templates'],
        ['tools/', 'Installer, preflight checks, and package verification CLI'],
        ['tests/ + fixtures/', 'Artifact failure tests and simulated registry states'],
        ['docs/ + demo/', 'Integration guides, release procedure, and recovery walkthrough']
      ],
      requirements: [
        ['Python', '3.12–3.14 and Git, including when checking npm projects'],
        ['JavaScript', 'Node 22.14+, 24, or 26; npm 10+ locally, 11.5.1+ for Trusted Publishing'],
        ['Package layout', 'Single-package repositories; pure Python with static setuptools metadata or ESM JavaScript with concrete exports'],
        ['Scope', 'No runtime package dependencies in v1; development dependencies must be locked'],
        ['Publishing', 'Your own registry accounts and supported GitHub approval gates; hosted publishing checks remain unverified']
      ],
      install: [
        ['Prepare the toolkit', 'Extract the kit, create a virtual environment, and install its hash-locked dependencies'],
        ['Try a reference package', 'Run validation, then use the installer on a copy of the Python or npm example'],
        ['Review before publishing', 'Adapt the configuration, inspect the dry-run artifacts, and follow the ecosystem guide before enabling a publishing workflow']
      ],
      commands: 'python3 -m venv .venv\n# Activate .venv for your shell, then:\npython -m pip install --require-hashes -r requirements.lock\npython tools/validate.py',
      boundary: 'The current release candidate has local validation evidence. Hosted approval behavior, real registry publishing, and buyer delivery still need verification',
      related: ['importkit', 'webhookkit']
    },
    {
      slug: 'importkit', name: 'ImportKit', category: 'data', price: 49,
      summary: 'Add CSV imports with previews, error checks, and progress',
      headline: 'Turn a messy CSV into usable data',
      description: 'Give users a clear path from uploading a file to reviewing errors and importing the rows that belong in your application',
      tags: ['React', 'FastAPI', 'PostgreSQL'], icon: 'layers', stamp: 'CSV / 002', artifact: 'customers.csv',
      stages: ['Upload', 'Check', 'Import', 'Done'], demo: ['email → customer.email', 'invalid rows → downloadable report', 'interrupted batch → resume'],
      features: [['Preview before writing', 'Map columns and review row errors before changing application data'], ['Keep large imports moving', 'Process batches with visible progress and saved checkpoints'], ['Explain every result', 'Separate accepted and rejected rows so users know what needs fixing']],
      contents: [['ui/', 'Upload, mapping, preview, and progress screens'], ['api/', 'FastAPI endpoints and import orchestration'], ['database/', 'Staging tables, checkpoints, and PostgreSQL migrations'], ['examples/ + tests/', 'Messy CSV samples, interruption checks, and integration instructions']],
      requirements: [['Frontend', 'React reference UI'], ['Backend', 'Python with FastAPI and PostgreSQL'], ['Input', 'CSV files with an explicit column schema and duplicate rules'], ['Boundary', 'No XLSX support or distributed worker system in the initial scope']],
      install: [['Define your columns', 'Decide which fields are required and how duplicate records should be handled'], ['Connect the reference app', 'Apply the database setup and connect the import endpoints to your app'], ['Run a sample import', 'Preview a sample CSV, interrupt a batch, and check the final row report']],
      boundary: 'CSV and PostgreSQL are the intended first configuration; supported versions and file limits will be confirmed before release', related: ['backfillkit', 'reconcilekit']
    },
    {
      slug: 'backfillkit', name: 'BackfillKit', category: 'data', price: 79,
      summary: 'Update PostgreSQL data with pause and resume controls',
      headline: 'Finish the data update without starting over',
      description: 'Work through large datasets in controlled batches, keep your place after an interruption, and check the result before calling the job done',
      tags: ['Python', 'PostgreSQL'], icon: 'batches', stamp: 'SQL / 003', artifact: 'backfill.checkpoint',
      stages: ['Select', 'Batch', 'Resume', 'Verify'], demo: ['cursor → next batch', 'pause → saved checkpoint', 'before / after → verification'],
      features: [['Control the pace', 'Throttle batch updates around the load your database can handle'], ['Keep your place', 'Persist cursors and checkpoints for deliberate pause and resume'], ['Check the change', 'Compare before-and-after results and review failed batches']],
      contents: [['runner/', 'Cursor-based batch runner and pause/resume controls'], ['database/', 'Checkpoint and run-history tables'], ['examples/', 'Repeatable data transforms and verification queries'], ['tests/ + docs/', 'Restart, contention, and concurrent-write scenarios']],
      requirements: [['Database', 'PostgreSQL'], ['Transforms', 'Idempotent updates that are safe to run again'], ['Access', 'A database role with the permissions needed for your chosen changes'], ['Boundary', 'No automatic rollback of arbitrary transformation logic']],
      install: [['Choose a stable cursor', 'Pick a key and transformation that can safely resume'], ['Set batch limits', 'Configure throughput and test the change on representative data'], ['Run and verify', 'Monitor progress, pause when necessary, and compare the result']],
      boundary: 'Database versions and operational limits will be documented with the release', related: ['importkit', 'synckit']
    },
    {
      slug: 'webhookkit', name: 'WebhookKit', category: 'infrastructure', price: 79,
      summary: 'Handle webhooks, duplicate events, and automatic retries',
      headline: 'Keep an event from becoming a lost update',
      description: 'Give incoming events a durable inbox, handle repeated deliveries, and make failures visible and recoverable',
      tags: ['HTTP', 'Database', 'Worker'], icon: 'events', stamp: 'HTTP / 004', artifact: 'event.inbox',
      stages: ['Receive', 'Save', 'Process', 'Replay'], demo: ['signature → verified', 'duplicate event → existing record', 'failed handler → retry queue'],
      features: [['Verify the sender', 'Check provider signatures before accepting events'], ['Handle duplicates', 'Track event keys so repeated deliveries do not blindly repeat your work'], ['Recover failed events', 'Inspect retries and replay selected events through an authenticated view']],
      contents: [['receiver/', 'Signature checking and one provider adapter'], ['inbox/', 'Durable event storage and deduplication keys'], ['worker/', 'Background processing and bounded retries'], ['replay/ + tests/', 'Authenticated replay view and event-failure examples']],
      requirements: [['Integration', 'An HTTP endpoint, durable database, and background worker'], ['Provider', 'One initial provider adapter; provider and runtime versions to be confirmed'], ['Handlers', 'Idempotent effects that tolerate at-least-once delivery'], ['Boundary', 'No exactly-once processing guarantee']],
      install: [['Configure the provider', 'Connect signing secrets and map incoming event types'], ['Add your handlers', 'Make each side effect safe to repeat and persist results'], ['Exercise retries', 'Send duplicate and invalid events, then retry a failed handler']],
      boundary: 'The first supported provider and reference stack will be listed before release', related: ['jobkit', 'auditkit']
    },
    {
      slug: 'jobkit', name: 'JobKit', category: 'infrastructure', price: 59,
      summary: 'Run background tasks with progress, cancellation, and retries',
      headline: 'Show what your background work is doing',
      description: 'Turn a long-running task into a visible job with clear progress, cancellation controls, and permission-aware results',
      tags: ['React', 'Queue', 'Database'], icon: 'queue', stamp: 'JOB / 005', artifact: 'export.job',
      stages: ['Queue', 'Run', 'Track', 'Download'], demo: ['queued → running → complete', 'cancel requested → worker checks', 'result download → permission check'],
      features: [['Make progress visible', 'Persist job state and expose it through a React dashboard'], ['Handle interruptions', 'Recover worker failures with explicit retries and cancellation rules'], ['Protect results', 'Check access before downloading artifacts and handle expiry']],
      contents: [['jobs/', 'Persistent job state and progress updates'], ['worker/', 'Queue integration, cancellation, and retry handling'], ['ui/', 'React job dashboard and result links'], ['tests/ + docs/', 'Worker-crash, duplicate-delivery, and expiry examples']],
      requirements: [['Frontend', 'React dashboard'], ['Backend', 'One queue and database; exact reference choices confirmed at release'], ['Tasks', 'Idempotent work or explicit tolerance for repeated execution'], ['Results', 'Storage and permission checks for generated files']],
      install: [['Define the task', 'Specify input, progress checkpoints, and cancellation behavior'], ['Connect the worker', 'Configure the queue, persistence, and result storage'], ['Add the dashboard', 'Connect job status to your app and test retry and cancellation paths']],
      boundary: 'Supported queue, database, and runtime versions are not yet finalized', related: ['webhookkit', 'uploadkit']
    },
    {
      slug: 'auditkit', name: 'AuditKit', category: 'saas', price: 49,
      summary: 'Track who changed what in your application and when',
      headline: 'Give every important change a history',
      description: 'Make account activity easier to investigate with searchable change records, actor context, and scoped exports',
      tags: ['Multi-tenant apps', 'Database'], icon: 'ledger', stamp: 'LOG / 006', artifact: 'activity.log',
      stages: ['Capture', 'Redact', 'Store', 'Find'], demo: ['actor + tenant → event context', 'secret field → redacted', 'filtered history → scoped export'],
      features: [['Keep the context', 'Capture the actor, tenant, time, and changed fields'], ['Leave secrets out', 'Redact sensitive fields before storing change records'], ['Find the answer', 'Search history and export only the records a user may access']],
      contents: [['events/', 'Append-only audit events and actor context'], ['redaction/', 'Field rules for sensitive changes'], ['history/', 'Search, scoped exports, and retention controls'], ['tests/ + docs/', 'Tenant isolation and concurrent-change examples']],
      requirements: [['Application', 'An authenticated app with stable actor and tenant identifiers'], ['Storage', 'Durable database for audit events'], ['Integration', 'Explicit capture points for the changes you need to record'], ['Boundary', 'Application history, not a compliance certification']],
      install: [['Choose the events', 'List the changes and actor details your users need to see'], ['Set field rules', 'Define redaction, tenant scope, and retention'], ['Connect history', 'Add event capture and verify access through search and export']],
      boundary: 'Reference framework, database versions, and retention implementation will be confirmed at release', related: ['meterkit', 'webhookkit']
    },
    {
      slug: 'meterkit', name: 'MeterKit', category: 'saas', price: 79,
      summary: 'Add usage limits, credits, and plan rules to your SaaS',
      headline: 'Make every credit count once',
      description: 'Track usage against a balance, apply plan limits, and explain charges and reversals through a readable history',
      tags: ['SaaS', 'Usage ledger'], icon: 'meter', stamp: 'USE / 007', artifact: 'usage.ledger',
      stages: ['Reserve', 'Use', 'Record', 'Release'], demo: ['request key → unique usage event', 'reservation → available credits', 'reversal → linked ledger entry'],
      features: [['Check before spending', 'Reserve usage atomically before starting metered work'], ['Handle repeated requests', 'Use event identifiers to avoid recording the same consumption twice'], ['Explain the balance', 'Show credits, consumption, and reversals in a customer-facing history']],
      contents: [['ledger/', 'Usage events, atomic reservations, and reversals'], ['plans/', 'Entitlement and plan-limit checks'], ['history/', 'Customer-facing balance and usage records'], ['tests/ + docs/', 'Concurrent usage and billing-period examples']],
      requirements: [['Application', 'Stable account IDs, plan definitions, and metered operations'], ['Database', 'Transactional storage for reservations and the usage ledger'], ['Integration', 'Your own billing integration when needed'], ['Boundary', 'No payment processing, tax calculation, or accounting service']],
      install: [['Define a unit', 'Choose what one credit represents and when it is consumed'], ['Add reservations', 'Connect limits and usage events to the metered action'], ['Check reversals', 'Test duplicate requests, failed work, and period boundaries']],
      boundary: 'Reference stack and supported billing integration points will be confirmed at release', related: ['auditkit', 'jobkit']
    },
    {
      slug: 'uploadkit', name: 'UploadKit', category: 'infrastructure', price: 49,
      summary: 'Add file uploads that resume after interruptions',
      headline: 'A dropped connection should not mean starting again',
      description: 'Upload in chunks, keep track of completed transfers, and control who can retrieve the finished file',
      tags: ['S3-compatible storage', 'HTTP'], icon: 'chunks', stamp: 'FILE / 008', artifact: 'upload.session',
      stages: ['Split', 'Send', 'Resume', 'Retrieve'], demo: ['chunk → checksum check', 'connection lost → saved session', 'private object → signed download'],
      features: [['Resume the transfer', 'Keep an upload session and continue with missing chunks'], ['Control access', 'Use private storage and authorized signed downloads'], ['Clean up unfinished work', 'Apply quotas and remove abandoned uploads']],
      contents: [['upload/', 'Chunked transfers and resumable sessions'], ['storage/', 'S3-compatible private object storage adapter'], ['access/', 'Quota checks and signed download handling'], ['cleanup/ + tests/', 'Abandoned-session cleanup and transfer-failure scenarios']],
      requirements: [['Storage', 'S3-compatible object storage'], ['Application', 'Authentication and explicit file ownership rules'], ['Limits', 'Bounded file sizes and configured quotas'], ['Boundary', 'No malware scanning service in the initial scope']],
      install: [['Connect storage', 'Configure a private bucket and restricted service credentials'], ['Set upload rules', 'Choose file limits, quotas, and session expiry'], ['Test an interruption', 'Resume a disconnected upload and verify download permissions']],
      boundary: 'Frontend stack, storage compatibility, and tested size limits will be published before release', related: ['jobkit', 'importkit']
    },
    {
      slug: 'reconcilekit', name: 'ReconcileKit', category: 'data', price: 99,
      summary: 'Compare records between systems and review differences',
      headline: 'Find where two systems stopped agreeing',
      description: 'Normalize records, understand mismatches, and review a repair before making changes to either system',
      tags: ['Data snapshots', 'Review workflow'], icon: 'compare', stamp: 'DIFF / 009', artifact: 'comparison.diff',
      stages: ['Snapshot', 'Match', 'Review', 'Resolve'], demo: ['source A / source B → normalized', 'missing / changed → classified', 'repair preview → human approval'],
      features: [['Compare like with like', 'Normalize identifiers and values before matching snapshots'], ['Explain differences', 'Classify missing, duplicate, and mismatched records for review'], ['Keep repairs deliberate', 'Preview the change and require approval before applying it']],
      contents: [['sources/', 'Snapshot readers and normalization rules'], ['compare/', 'Matching and mismatch classification'], ['review/', 'Discrepancy review and repair previews'], ['tests/ + docs/', 'Duplicate IDs, stale snapshots, and repeated-repair cases']],
      requirements: [['Inputs', 'Two snapshots with stable identifiers'], ['Domain', 'One narrow data model with explicit comparison rules'], ['Access', 'Read access for comparison; separate authorization for repairs'], ['Boundary', 'No autonomous high-risk financial changes']],
      install: [['Choose matching keys', 'Define what makes two records equivalent'], ['Compare snapshots', 'Normalize inputs and review the classified differences'], ['Review a repair', 'Check current data again before approving a change']],
      boundary: 'Initial domain, source adapters, and reference stack will be confirmed at release', related: ['synckit', 'backfillkit']
    },
    {
      slug: 'synckit', name: 'SyncKit', category: 'data', price: 99,
      summary: 'Keep application data synchronized with external APIs',
      headline: 'Pick up where the API left off',
      description: 'Keep an external dataset up to date with saved cursors, bounded retries, and clear handling for changes and deletions',
      tags: ['REST APIs', 'Local database'], icon: 'sync', stamp: 'API / 010', artifact: 'sync.cursor',
      stages: ['Fetch', 'Save', 'Retry', 'Compare'], demo: ['page cursor → saved position', 'rate limit → bounded retry', 'remote deletion → explicit rule'],
      features: [['Start once, then update', 'Separate the initial import from incremental changes'], ['Handle API interruptions', 'Save progress and retry within known rate and time limits'], ['Spot drift', 'Compare local state with the source and define deletion behavior']],
      contents: [['connector/', 'One provider adapter and a mock API'], ['sync/', 'Initial and incremental pulls with cursor history'], ['recovery/', 'Bounded retries and drift detection'], ['tests/ + docs/', 'Repeated pages, expired cursors, and outage examples']],
      requirements: [['Provider', 'One supported external API, to be announced'], ['Credentials', 'Your own API account and required access scopes'], ['Storage', 'Local persistence for records and checkpoints'], ['Boundary', 'Explicit deletion rules; no universal connector collection']],
      install: [['Map the source', 'Choose fields, identifiers, and deletion behavior'], ['Run the first sync', 'Configure credentials and persist page checkpoints'], ['Exercise recovery', 'Test a rate limit and interruption before scheduling updates']],
      boundary: 'Provider adapter, API versions, and refresh limits will be documented before release', related: ['reconcilekit', 'backfillkit']
    }
  ].map(product => Object.freeze({
    availability: 'coming-soon', checkoutUrl: '', deliveryVerified: false,
    termsApproved: false, priceConfirmed: false, currency: 'USD', ...product
  }));
  function canPurchase(product) {
    if (!product || product.availability !== 'available' || product.deliveryVerified !== true || product.termsApproved !== true || product.priceConfirmed !== true || !Number.isFinite(product.price) || product.price <= 0 || product.currency !== 'USD') return false;
    try {
      const url = new URL(product.checkoutUrl);
      return url.protocol === 'https:' && url.hostname === 'devkitclub.lemonsqueezy.com' && url.pathname.startsWith('/checkout/buy/') && !url.username && !url.password && !url.searchParams.has('test');
    } catch (_) { return false; }
  }
  return Object.freeze({products: Object.freeze(products), canPurchase});
});
