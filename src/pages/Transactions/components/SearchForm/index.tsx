import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SearchFromContainer } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo } from "react";

const seachFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof seachFormSchema>;

 function SearchFormComponent() {
    const fetchTransactions  = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const { 
        register,
        handleSubmit,
        formState:{
            isSubmitting,
        } 
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(seachFormSchema),

    })

    async function handleSearchTransactions(data: SearchFormInputs){
        await fetchTransactions(data.query)
    }

    return (
        <SearchFromContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text" 
                placeholder="Busque por transacoes"
                {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFromContainer>
    )
}

export const SearchForm = memo(SearchFormComponent);