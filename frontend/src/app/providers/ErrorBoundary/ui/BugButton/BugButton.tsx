import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button/ui/Button';

interface BugButtonProps {
    className?: string
}

const BugButton = ({ className }: BugButtonProps) => {
    const [error, setError] = useState(false);
    const throwError = () => { setError((prev) => !prev); };

    useEffect(() => {
        if (error) throw new Error();
    }, [error]);

    return (
        <Button
            onClick={throwError}
            className={classNames('', {}, [className])}
        >
            Вызвать ошибку
        </Button>
    );
};

export default BugButton;
