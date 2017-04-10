export default function formatDuration(ms)
{
    if (ms < 1000) {
        return ms  + '&micro;s';
    } else if (ms < 1000000) {
        return (ms / 1000).toFixed(2) + 'ms';
    }
    return (ms / 1000000).toFixed(2) + 's';
}
