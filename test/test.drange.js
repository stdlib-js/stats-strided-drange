/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var isPositiveZero = require( '@stdlib/math-base-assert-is-positive-zero' );
var Float64Array = require( '@stdlib/array-float64' );
var drange = require( './../lib/drange.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof drange, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function has an arity of 3', function test( t ) {
	t.strictEqual( drange.length, 3, 'has expected arity' );
	t.end();
});

tape( 'the function calculates the range of a strided array', function test( t ) {
	var x;
	var v;

	x = new Float64Array( [ 1.0, -2.0, -4.0, 5.0, 0.0, 3.0 ] );
	v = drange( x.length, x, 1 );
	t.strictEqual( v, 9.0, 'returns expected value' );

	x = new Float64Array( [ -4.0, -5.0 ] );
	v = drange( x.length, x, 1 );
	t.strictEqual( v, 1.0, 'returns expected value' );

	x = new Float64Array( [ -0.0, 0.0, -0.0 ] );
	v = drange( x.length, x, 1 );
	t.strictEqual( isPositiveZero( v ), true, 'returns expected value' );

	x = new Float64Array( [ NaN ] );
	v = drange( x.length, x, 1 );
	t.strictEqual( isnan( v ), true, 'returns expected value' );

	x = new Float64Array( [ NaN, NaN ] );
	v = drange( x.length, x, 1 );
	t.strictEqual( isnan( v ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided an `N` parameter less than or equal to `0`, the function returns `NaN`', function test( t ) {
	var x;
	var v;

	x = new Float64Array( [ 1.0, -2.0, -4.0, 5.0, 3.0 ] );

	v = drange( 0, x, 1 );
	t.strictEqual( isnan( v ), true, 'returns expected value' );

	v = drange( -1, x, 1 );
	t.strictEqual( isnan( v ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided an `N` parameter equal to `1`, the function returns `0` or `NaN`', function test( t ) {
	var x;
	var v;

	x = new Float64Array( [ 1.0, -2.0, -4.0, 5.0, 3.0 ] );

	v = drange( 1, x, 1 );
	t.strictEqual( v, 0.0, 'returns expected value' );

	x = new Float64Array( [ NaN, -2.0, -4.0, 5.0, 3.0 ] );

	v = drange( 1, x, 1 );
	t.strictEqual( isnan( v ), true, 'returns expected value' );

	t.end();
});

tape( 'the function supports a `stride` parameter', function test( t ) {
	var x;
	var v;

	x = new Float64Array([
		1.0,  // 0
		2.0,
		2.0,  // 1
		-7.0,
		-2.0, // 2
		3.0,
		4.0,  // 3
		2.0
	]);

	v = drange( 4, x, 2 );

	t.strictEqual( v, 6.0, 'returns expected value' );
	t.end();
});

tape( 'the function supports a negative `stride` parameter', function test( t ) {
	var x;
	var v;

	x = new Float64Array([
		1.0,  // 3
		2.0,
		2.0,  // 2
		-7.0,
		-2.0, // 1
		3.0,
		4.0,  // 0
		2.0
	]);

	v = drange( 4, x, -2 );

	t.strictEqual( v, 6.0, 'returns expected value' );
	t.end();
});

tape( 'if provided a `stride` parameter equal to `0`, the function returns `0` or `NaN`', function test( t ) {
	var x;
	var v;

	x = new Float64Array( [ 1.0, -2.0, -4.0, 5.0, 3.0 ] );

	v = drange( x.length, x, 0 );
	t.strictEqual( v, 0.0, 'returns expected value' );

	x = new Float64Array( [ NaN, -2.0, -4.0, 5.0, 3.0 ] );

	v = drange( x.length, x, 0 );
	t.strictEqual( isnan( v ), true, 'returns expected value' );

	t.end();
});

tape( 'the function supports view offsets', function test( t ) {
	var x0;
	var x1;
	var v;

	x0 = new Float64Array([
		2.0,
		1.0,  // 0
		2.0,
		-2.0, // 1
		-2.0,
		2.0,  // 2
		3.0,
		4.0,  // 3
		6.0
	]);

	x1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // start at 2nd element

	v = drange( 4, x1, 2 );
	t.strictEqual( v, 6.0, 'returns expected value' );

	t.end();
});
