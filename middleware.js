import { NextResponse } from 'next/server'

export function middleware(request) {
    return NextResponse.next({
        request: {
            // New request headers
            'x-pathname': request.nextUrl.pathname,
        },
    });
}