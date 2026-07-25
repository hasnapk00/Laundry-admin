import { MapPinned, ExternalLink } from "lucide-react";

const LocationMap = ({ order }) => {
  const pickupAddress = order?.pickupAddress;
  const latitude = order?.latitude;
  const longitude = order?.longitude;

  // Prefer the human-readable pickup address (more precise on the map than
  // raw coordinates), falling back to lat/long if it's ever missing.
  const query = pickupAddress
    ? encodeURIComponent(pickupAddress)
    : latitude && longitude
    ? `${latitude},${longitude}`
    : null;

  const embedSrc = query ? `https://www.google.com/maps?q=${query}&output=embed` : null;
  const mapsUrl = query ? `https://www.google.com/maps?q=${query}` : null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A843]/10 text-[#E8A843]">
            <MapPinned size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Pickup Location
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {pickupAddress || "Pickup address not available"}
            </p>
          </div>
        </div>

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-[#E8A843] hover:text-[#E8A843] transition-colors"
          >
            <ExternalLink size={13} />
            Open in Maps
          </a>
        )}
      </div>

      {/* Map */}
      <div className="p-4">
        {embedSrc ? (
          <div className="h-[350px] w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <iframe
              title="Pickup location map"
              src={embedSrc}
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="flex h-[350px] w-full items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="text-center px-4">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8A843]/10">
                <MapPinned size={28} className="text-[#E8A843]" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                No pickup location set
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add a pickup address or coordinates to this order to see it on the map.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;