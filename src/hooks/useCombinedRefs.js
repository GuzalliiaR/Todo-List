const useCombinedRefs = (...refs) => {
    return (node) => {
        refs.forEach((ref) => {
            if (!ref) {
                return
            };

            if (typeof ref === 'function') {
                ref(node);
            } else { // инче ref - это объект
                ref.current = node;
            };
        })
    };
};

export default useCombinedRefs;