'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { AddressComponents, emptyAddress } from '../types'
import { cn } from '@/lib/utils'
import { MapPin, CheckCircle2, Loader2 } from 'lucide-react'

interface AddressAutocompleteProps {
    value: AddressComponents
    onChange: (address: AddressComponents) => void
    apiKey: string
}

function parseAddressComponents(place: google.maps.places.PlaceResult): AddressComponents {
    const components = place.address_components || []

    const get = (type: string): string => {
        const comp = components.find((c) => c.types.includes(type))
        return comp?.long_name || ''
    }

    const getShort = (type: string): string => {
        const comp = components.find((c) => c.types.includes(type))
        return comp?.short_name || ''
    }

    const streetNumber = get('street_number')
    const route = get('route')
    const street = streetNumber ? `${streetNumber} ${route}` : route

    return {
        fullAddress: place.formatted_address || '',
        street,
        city: get('locality') || get('sublocality_level_1') || get('administrative_area_level_2'),
        state: getShort('administrative_area_level_1'),
        zip: get('postal_code'),
        county: get('administrative_area_level_2'),
        placeId: place.place_id || '',
        lat: place.geometry?.location?.lat() || null,
        lng: place.geometry?.location?.lng() || null,
        verified: true,
    }
}

export function AddressAutocomplete({ value, onChange, apiKey }: AddressAutocompleteProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
    const [inputValue, setInputValue] = useState(value.fullAddress)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Load Google Maps script
    useEffect(() => {
        if (typeof window !== 'undefined' && window.google?.maps?.places) {
            setIsLoaded(true)
            setIsLoading(false)
            return
        }

        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
        if (existingScript) {
            existingScript.addEventListener('load', () => {
                setIsLoaded(true)
                setIsLoading(false)
            })
            return
        }

        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
        script.async = true
        script.defer = true
        script.onload = () => {
            setIsLoaded(true)
            setIsLoading(false)
        }
        script.onerror = () => {
            setIsLoading(false)
        }
        document.head.appendChild(script)
    }, [apiKey])

    // Initialize autocomplete
    useEffect(() => {
        if (!isLoaded || !inputRef.current || autocompleteRef.current) return

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'us' },
            types: ['address'],
            fields: ['address_components', 'formatted_address', 'geometry', 'place_id'],
        })

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()
            if (place && place.address_components) {
                const parsed = parseAddressComponents(place)
                setInputValue(parsed.fullAddress)
                onChange(parsed)
            }
        })

        autocompleteRef.current = autocomplete
    }, [isLoaded, onChange])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        if (value.verified) {
            onChange({ ...emptyAddress, fullAddress: newValue })
        }
    }

    const handleClear = () => {
        setInputValue('')
        onChange({ ...emptyAddress })
        inputRef.current?.focus()
    }

    return (
        <div className="space-y-3">
            <div className="relative">
                <MapPin className="text-muted-foreground pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2" />
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={isLoading ? 'Loading address search…' : 'Start typing your home address'}
                    disabled={isLoading}
                    className={cn(
                        'bg-card ring-foreground/10 text-foreground placeholder:text-muted-foreground w-full rounded-xl border border-transparent py-3 pl-10 pr-10 text-sm shadow ring-1 outline-none focus:ring-sky-500',
                        value.verified && 'ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'
                    )}
                />
                {value.verified && (
                    <CheckCircle2 className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-emerald-500" />
                )}
                {isLoading && (
                    <Loader2 className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                )}
            </div>

            {value.verified && (
                <div className="ring-foreground/6.5 flex items-start gap-3 rounded-xl bg-zinc-50 p-3 ring-1 dark:bg-zinc-900">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <div className="space-y-0.5 text-xs">
                        <div className="text-foreground font-medium">Address verified</div>
                        <div className="text-muted-foreground">{value.street}</div>
                        <div className="text-muted-foreground">{value.city}, {value.state} {value.zip}</div>
                        {value.county && <div className="text-muted-foreground">{value.county} County</div>}
                        <button
                            type="button"
                            onClick={handleClear}
                            className="mt-1 text-sky-500 hover:underline">
                            Change address
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
