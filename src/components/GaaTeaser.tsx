/**
 * GAA 2020–2026 preview on the home page
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shortNameOf } from '../config';
import { php, plural } from '../lib/format';
import { gaaYearTotals, loadGaa, type GaaResult } from '../lib/gaa';
import { usePortal } from '../lib/portal-context';

type State =
    | { status: 'loading' }
    | { status: 'ready'; value: GaaResult }
    | { status: 'error' };

export default function GaaTeaser() {
    const { config, client } = usePortal();
    const [state, setState] = useState<State>({ status: 'loading' });

    useEffect(() => {
        let live = true;
        // The same memoised search as the /gaa page, so opening it afterwards is instant.
        loadGaa(client, config).then(
            (value) => live && setState({ status: 'ready', value }),
            () => live && setState({ status: 'error' }),
        );
        return () => { live = false; };
    }, [client, config]);

    // No places to search, or the search failed: the /gaa page explains either; stay quiet here.
    if (!config.scope.places?.length || state.status === 'error') return null;

    const name = shortNameOf(config);

    return (
        <section className="section" aria-labelledby="gaa-teaser-h" aria-busy={state.status === 'loading'}>
            <h2 id="gaa-teaser-h" className="section-h">Enacted budgets, 2020–2026</h2>

            {state.status === 'loading' ? (
                <p className="section-lede">Searching the enacted budgets for {name}…</p>
            ) : (
                <>
                    <p className="section-lede">
                        {plural(state.value.rows.length, 'program or project', 'programs and projects')} in
                        the General Appropriations Acts name {name}. Each figure is that year’s appropriation
                        (the authority to spend, not spending). Years are shown side by side, never added,
                        and apart from the 2027 versions above.
                    </p>

                    <dl className="stats stats-years">
                        {gaaYearTotals(state.value.rows).map((y) => (
                            <div key={y.year}>
                                <dt className="label">{y.year}</dt>
                                <dd className="stat num">{y.amount > 0 ? php(y.amount) : '—'}</dd>
                                <dd className="stat-sub">{plural(y.programs, 'line')}</dd>
                            </div>
                        ))}
                    </dl>
                </>
            )}

            <p className="stats-years-more">
                <Link to="/gaa">See every program and project, 2020–2026 →</Link>
            </p>
        </section>
    );
}