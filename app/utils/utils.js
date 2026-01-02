// import { clsx } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// export const cn = (...inputs) => {
// 	return twMerge(clsx(inputs));
// };

export const getRelativeTime = time => {
	const now = Date.now();
	const selectedTime = new Date(time).getTime();
	if (!selectedTime) return '';

	const diffMs = now - selectedTime;
	const diffMinutes = Math.floor(diffMs / 60000);

	if (diffMinutes < 1 || diffMinutes < 0) {
		return 'just now';
	}
	if (diffMinutes < 60) {
		return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
	}

	const diffHours = Math.floor(diffMinutes / 60);
	if (diffMinutes < 1440) {
		return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
	}

	const diffDays = Math.floor(diffMinutes / 1440);
	if (diffDays === 1) {
		return 'yesterday';
	}
	if (diffMinutes < 525600) {
		return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
	}

	const diffYears = Math.floor(diffMinutes / 525600);
	return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
};

export const formatHour = hour => {
	const suffix = hour >= 12 ? 'PM' : 'AM';
	const display = hour % 12 === 0 ? 12 : hour % 12;
	return `${display}:00 ${suffix}`;
};

export const formatDate = date =>
	date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

export const formatDayLabel = date =>
	date.toLocaleDateString(undefined, { weekday: 'short' });

export const formatInputDate = date => date.toISOString().split('T')[0];

export const formatTime = date =>
	date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});

export const getWeekStart = date => {
	const d = new Date(date);
	const day = d.getDay();
	const mondayBased = day === 0 ? 7 : day;

	const diff = mondayBased - 1;

	d.setDate(d.getDate() - diff);
	d.setHours(0, 0, 0, 0);
	return d;
};

// Returns a human-friendly remaining time until a future datetime.
export const getTimeLeft = time => {
	const target = new Date(time).getTime();
	if (!target) return '';

	const diffMs = target - Date.now();
	if (diffMs <= 0) return 'due';

	const diffMinutes = Math.ceil(diffMs / 60000);
	if (diffMinutes < 60) {
		return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} left`;
	}

	const diffHours = Math.ceil(diffMinutes / 60);
	if (diffMinutes < 1440) {
		return `${diffHours} hour${diffHours === 1 ? '' : 's'} left`;
	}

	const diffDays = Math.ceil(diffMinutes / 1440);
	return `${diffDays} day${diffDays === 1 ? '' : 's'} left`;
};
