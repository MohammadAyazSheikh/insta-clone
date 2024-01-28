type UniqueValues<T extends string> = Record<T, true>
type inputType = {
    keyboardType?: 'email-address' | 'phone-pad' | 'visible-password' | 'decimal-pad' | 'default'
    required: boolean,
    label?: string,
    name: string,
    disabled?: boolean,
    placeHolder?: string,
}