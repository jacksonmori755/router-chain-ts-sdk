import { RouterExplorer } from '../src';

describe('Queries Test', () => {
  const explorer = new RouterExplorer(
    'local',
    '0x7256A1B8221e4dFbe113761c0d284CC14bA6cCbe'
  );
  it('Fetch Crosstalk by search - ', async () => {
    const CrossTalks = await explorer.getFilteredCrossTalks(
      'CHAIN_TYPE_EVM',
      '43113'
    );
    console.log('Crosstalk =>', JSON.stringify(CrossTalks));
    expect(CrossTalks).toBeDefined();
  });
});

//  it('Fetch Blocks', async () => {
//    const latestBlocks = await explorer.getLatestBlocks(
//      10,
//      5
//    );
//    console.log(
//      'latestBlocks =>',
//      JSON.stringify(latestBlocks)
//    );
//    expect(latestBlocks).toBeDefined();
//  });
//  it('Fetch individual block by its height', async () => {
//    const block = await explorer.getBlockByHeight(
//      50
//    );
//    console.log(
//      'block =>',
//      JSON.stringify(block)
//    );
//    expect(block).toBeDefined();
//  });
// it('Fetch Transaction', async () => {
//   const latestTransactions = await explorer.getLatestTransactions(10, 1);
//   console.log('latestTransactions =>', JSON.stringify(latestTransactions));
//   expect(latestTransactions).toBeDefined();
// });
// it('Fetch Transaction', async () => {
//   const latestTransactions = await explorer.getLatestTransactionsByAddress(
//     '',
//     10,
//     1
//   );
//   console.log(
//     'latestTransactionsbyAddress =>',
//     JSON.stringify(latestTransactions)
//   );
//   expect(latestTransactions).toBeDefined();
// });
//  it('Fetch individual transaction by its hash', async () => {
//    const transaction = await explorer.getTransactionByHash(
//      'FDC67FAA5BC8ECC6C6ADD72F508147DC3B37FB41961441B7762FB27673A30FB8'
//    );
//    console.log(
//      'transaction =>',
//      JSON.stringify(transaction)
//    );
//    expect(transaction).toBeDefined();
//  });
// it('Fetch Inbound', async () => {
//   const latestInbounds = await explorer.getLatestInbounds(10, 1);
//   console.log('latestInbounds =>', JSON.stringify(latestInbounds));
//   expect(latestInbounds).toBeDefined();
// });
// it('Fetch Inbound', async () => {
//   const explorer = new RouterExplorer(
//     'local',
//     'router1r22k3my03clkws8phjhfcc3ny45p939hwkh0f05wjyl27a3y8cwsv3h372'
//   );
//   const latestInbounds = await explorer.getLatestInbounds(10, 1);
//   console.log('latestInbounds =>', JSON.stringify(latestInbounds));
//   expect(latestInbounds).toBeDefined();
// });
//  it('Filter Inbound', async () => {
//    const explorer = new RouterExplorer(
//      'local',
//      'router1r22k3my03clkws8phjhfcc3ny45p939hwkh0f05wjyl27a3y8cwsv3h372'
//    );
//    const latestInbounds = await explorer.getFilteredInbounds(
//      '0xde23c5ffc7b045b48f0b85ada2c518d213d9e24f',
//      10,
//      1
//    );
//    console.log(
//      'latestInbounds =>',
//      JSON.stringify(latestInbounds)
//    );
//    expect(latestInbounds).toBeDefined();
//  });
// it('Fetch individual inbound by its formAttestationId', async () => {
//   const inbound = await explorer.getInboundByAttestationId(
//     'CHAIN_TYPE_EVM-1-2'
//   );
//   console.log('Inbound =>', JSON.stringify(inbound));
//   expect(inbound).toBeDefined();
// });
//  it('Fetch individual transaction by its hash', async () => {
//    const paginatedInbound = await explorer.getInboundBySearch(
//      'CHAIN_TYPE_EVM-1-1'
//    );
//    console.log(
//      'inbound =>',
//      JSON.stringify(paginatedInbound)
//    );
//    expect(paginatedInbound).toBeDefined();
//  });
//  it('Fetch Outbound', async () => {
//    const latestOutbounds = await explorer.getLatestOutbounds(
//      10,
//      1
//    );
//    console.log(
//      'latestOutbounds =>',
//      JSON.stringify(latestOutbounds)
//    );
//    expect(latestOutbounds).toBeDefined();
//  });
//  it('Fetch individual transaction by its hash', async () => {
//    const paginatedOutbound = await explorer.getOutboundBySearch(
//      'CHAIN_TYPE_EVM',
//      '80001',
//      'router1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ys8kpdc7'
//    );
//    console.log(
//      'Outbound =>',
//      JSON.stringify(paginatedOutbound)
//    );
//    expect(paginatedOutbound).toBeDefined();
//  });
// it('Fetch Latest Crosstalks - ', async () => {
//   const CrossTalks = await explorer.getLatestCrossTalks(10, 1);
//   console.log('Crosstalks =>', JSON.stringify(CrossTalks));
//   expect(CrossTalks).toBeDefined();
// });
  // it('Fetch Crosstalk by Attestation id - ', async () => {
  //   const CrossTalks = await explorer.getCrossTalkByAttestationId(
  //     'CHAIN_TYPE_EVM-43113-2'
  //   );
  //   console.log('Crosstalk =>', JSON.stringify(CrossTalks));
  //   expect(CrossTalks).toBeDefined();
  // });