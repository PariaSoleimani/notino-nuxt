export const setAuthCookies = (event, session) => {
	if (!session) return;

	setCookie(event, 'sb_access_token', session.access_token ?? '', {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60,
	});

	setCookie(event, 'sb_refresh_token', session.refresh_token ?? '', {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
	});
};

export const clearAuthCookies = (event) => {
	setCookie(event, 'sb_access_token', '', { path: '/', maxAge: 0 });
	setCookie(event, 'sb_refresh_token', '', { path: '/', maxAge: 0 });
};
