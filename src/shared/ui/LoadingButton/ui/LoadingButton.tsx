import { Button, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material';

type LoadingButtonProps = ButtonProps & {
	loading?: boolean;
	loadingIndicator?: React.ReactNode;
};

export const LoadingButton = ({
	loading = false,
	loadingIndicator = <CircularProgress size={24} color='inherit' />,
	children,
	disabled,
	...props
}: LoadingButtonProps) => (
	<Button
		disabled={disabled || loading}
		startIcon={loading ? loadingIndicator : props.startIcon}
		{...props}>
		{children}
	</Button>
);
