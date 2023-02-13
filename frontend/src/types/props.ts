export type InputProps = {
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    isPassword: boolean
}
export type ButtonProps = {
    name: string,
    class: string,
    onClick: VoidFunction,
}