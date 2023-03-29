import { Rpc } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryPoolsRequest, QueryPoolsResponse, QueryParamsRequest, QueryParamsResponse, QueryLiquidityDepthsForRangeRequest, QueryLiquidityDepthsForRangeResponse, QueryUserPositionsRequest, QueryUserPositionsResponse, QueryTotalLiquidityForRangeRequest, QueryTotalLiquidityForRangeResponse, QueryClaimableFeesRequest, QueryClaimableFeesResponse, QueryPositionByIdRequest, QueryPositionByIdResponse } from "./query";
export interface Query {
  /** Pools returns all concentrated liquidity pools */
  pools(request?: QueryPoolsRequest): Promise<QueryPoolsResponse>;
  /** Params returns concentrated liquidity module params. */

  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** LiquidityDepthsForRange returns Liqiudity Depths for given range */

  liquidityDepthsForRange(request: QueryLiquidityDepthsForRangeRequest): Promise<QueryLiquidityDepthsForRangeResponse>;
  /** UserPositions returns all concentrated postitions of some address. */

  userPositions(request: QueryUserPositionsRequest): Promise<QueryUserPositionsResponse>;
  /** TotalLiquidityForRange the amount of liquidity existing within given range. */

  totalLiquidityForRange(request: QueryTotalLiquidityForRangeRequest): Promise<QueryTotalLiquidityForRangeResponse>;
  /**
   * ClaimableFees returns the amount of fees that can be claimed by a position
   * with the given id.
   */

  claimableFees(request: QueryClaimableFeesRequest): Promise<QueryClaimableFeesResponse>;
  /** PositionById returns a position with the given id. */

  positionById(request: QueryPositionByIdRequest): Promise<QueryPositionByIdResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.pools = this.pools.bind(this);
    this.params = this.params.bind(this);
    this.liquidityDepthsForRange = this.liquidityDepthsForRange.bind(this);
    this.userPositions = this.userPositions.bind(this);
    this.totalLiquidityForRange = this.totalLiquidityForRange.bind(this);
    this.claimableFees = this.claimableFees.bind(this);
    this.positionById = this.positionById.bind(this);
  }

  pools(request: QueryPoolsRequest = {
    pagination: undefined
  }): Promise<QueryPoolsResponse> {
    const data = QueryPoolsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "Pools", data);
    return promise.then(data => QueryPoolsResponse.decode(new _m0.Reader(data)));
  }

  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  liquidityDepthsForRange(request: QueryLiquidityDepthsForRangeRequest): Promise<QueryLiquidityDepthsForRangeResponse> {
    const data = QueryLiquidityDepthsForRangeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "LiquidityDepthsForRange", data);
    return promise.then(data => QueryLiquidityDepthsForRangeResponse.decode(new _m0.Reader(data)));
  }

  userPositions(request: QueryUserPositionsRequest): Promise<QueryUserPositionsResponse> {
    const data = QueryUserPositionsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "UserPositions", data);
    return promise.then(data => QueryUserPositionsResponse.decode(new _m0.Reader(data)));
  }

  totalLiquidityForRange(request: QueryTotalLiquidityForRangeRequest): Promise<QueryTotalLiquidityForRangeResponse> {
    const data = QueryTotalLiquidityForRangeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "TotalLiquidityForRange", data);
    return promise.then(data => QueryTotalLiquidityForRangeResponse.decode(new _m0.Reader(data)));
  }

  claimableFees(request: QueryClaimableFeesRequest): Promise<QueryClaimableFeesResponse> {
    const data = QueryClaimableFeesRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "ClaimableFees", data);
    return promise.then(data => QueryClaimableFeesResponse.decode(new _m0.Reader(data)));
  }

  positionById(request: QueryPositionByIdRequest): Promise<QueryPositionByIdResponse> {
    const data = QueryPositionByIdRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "PositionById", data);
    return promise.then(data => QueryPositionByIdResponse.decode(new _m0.Reader(data)));
  }

}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    pools(request?: QueryPoolsRequest): Promise<QueryPoolsResponse> {
      return queryService.pools(request);
    },

    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },

    liquidityDepthsForRange(request: QueryLiquidityDepthsForRangeRequest): Promise<QueryLiquidityDepthsForRangeResponse> {
      return queryService.liquidityDepthsForRange(request);
    },

    userPositions(request: QueryUserPositionsRequest): Promise<QueryUserPositionsResponse> {
      return queryService.userPositions(request);
    },

    totalLiquidityForRange(request: QueryTotalLiquidityForRangeRequest): Promise<QueryTotalLiquidityForRangeResponse> {
      return queryService.totalLiquidityForRange(request);
    },

    claimableFees(request: QueryClaimableFeesRequest): Promise<QueryClaimableFeesResponse> {
      return queryService.claimableFees(request);
    },

    positionById(request: QueryPositionByIdRequest): Promise<QueryPositionByIdResponse> {
      return queryService.positionById(request);
    }

  };
};